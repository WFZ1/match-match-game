interface IRouterOpts {
  [key: string]: string;
}

interface IRout {
  path: string;
  callback: () => void;
}

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

  /* ADDING ROUTES ================================================================================ */

  public add(path: string, callback: () => void): Router {
    this.routes.push({ path, callback });
    return this;
  }

  /* DELETING ROUTES ================================================================================ */

  public remove(path: string): Router {
    const routeIndex: number = this.routes.findIndex(
      (route) => route.path === path,
    );
    if (routeIndex + 1) this.routes.splice(routeIndex, 1);
    return this;
  }

  /* FLUSH ROUTES ARRAY ================================================================================ */

  public flush(): void {
    this.routes = [];
  }

  /* CLEAR SLASHES INSIDE PATH ================================================================================ */

  static clearSlashes(path: string): string {
    return path.replace(/^\/|\/$/g, '');
  }

  /* GET CURRENT PAGE NAME ================================================================================ */

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

  /* GO TO PAGE ================================================================================ */

  public navigate(path = ''): Router {
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

  /* START LISTEN CHANGING URL ================================================================================ */

  private listen(): void {
    setInterval(Router.interval, 50, this);
  }

  static interval(that: Router): void {
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

export default Router;
