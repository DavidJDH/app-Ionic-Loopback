import { Articulo } from "./articulo";

export class Factura {
    public id?: any;
    public fecha: any;
    public articulos: Articulo[] = [];
    public subtotal: any;
    public total: any;
    public iva: any;
    public descuento: any;
    public userId: any;


}
