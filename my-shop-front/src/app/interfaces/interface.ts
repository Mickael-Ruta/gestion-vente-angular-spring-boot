
export interface Iacheteur{
  id : string,
  nom: string,
  prenoms : string | null,
  numTel: string,
  adresse : string
}

export interface Iproduit{
  id:string,
  nom:string,
  imgUrl:string,
  category : string,
  nbreVendu:number,
  nbreStock:number,
  note:number,
  prix:number,
  prixTotal : number,
  qteCommande : number
}


export interface Iachat{
  id:string,
  idClient : string,
  idProduit : string,
  qteCommande : number,
  prixTotal:number
}

export interface IachatTotal{
  total : number,
  date: string
}
