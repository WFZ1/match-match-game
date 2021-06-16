import IRout from '../../types/rout.type';
import IRouterOpts from '../../types/router-opts.type';

class Router {
  private routes: IRout[] = []; // list of registered routes

  private readonly root: string = '/'; // for history mode

  private readonly mode: string = 'history'; // or 'hash'

  private curPage: string | undefined = undefined;

  constructor({ mode, root }: IRouterOpts) {
    if (mode) this.mode = mode;
    if (root) this.root = root;

    this.listen();
  }

  add(path: string, callback: () => void): Router {
    this.routes.push({ path, callback });
    return this;
  }

  remove(path: string): Router {
    const routeIndex: number = this.routes.findIndex(
      (route) => route.path === path,
    );
    if (routeIndex + 1) this.routes.splice(routeIndex, 1);
    return this;
  }

  flush(): void {
    this.routes = [];
  }

  private static clearSlashes(path: string): string {
    return path.replace(/^\/|\/$/g, '');
  }

  private getPageName(): string {
    let name = '';

    if (this.mode === 'history') {
      name = decodeURI(window.location.pathname);

      if (this.root !== '/') name = name.replace(this.root, '');
    } else {
      const match = window.location.href.match(/#(.*)$/);
      name = match ? match[1] : '';
    }

    return Router.clearSlashes(name);
  }

  navigate(path = ''): Router {
    if (this.mode === 'history') {
      window.history.pushState(null, '', this.root + path);
    } else {
      window.location.href = `${window.location.href.replace(
        /#(.*)$/,
        '',
      )}#${path}`;
    }

    return this;
  }

  // Start listen changing url
  private listen(): void {
    setInterval(Router.interval, 50, this);
  }

  private static interval(that: Router): void {
    const pageName = that.getPageName();

    if (that.curPage === pageName) return;
    that.curPage = pageName;

    that.routes.some((route) => {
      if (that.curPage === route.path) {
        route.callback();
        return true;
      }

      return false;
    });
  }
}

const router = new Router({});
export default router;
