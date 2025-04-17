import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MonggoldDataSource} from '../datasources';
import {Producto, ProductoRelations} from '../models';

export class ProductoRepository extends DefaultCrudRepository<
  Producto,
  typeof Producto.prototype.id,
  ProductoRelations
> {
  constructor(
    @inject('datasources.monggold') dataSource: MonggoldDataSource,
  ) {
    super(Producto, dataSource);
  }
}
