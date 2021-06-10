import IDropDownListItem from './drop-down-list-item.type';

export default interface IGameParams {
  title: string;
  id: string;
  options: IDropDownListItem[];
}
