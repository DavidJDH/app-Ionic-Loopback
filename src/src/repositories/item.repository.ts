import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MonggoldDataSource} from '../datasources';
import {Item, ItemRelations} from '../models';

export class ItemRepository extends DefaultCrudRepository<
  Item,
  typeof Item.prototype.id,
  ItemRelations
> {
  constructor(
    @inject('datasources.monggold') dataSource: MonggoldDataSource,
  ) {
    super(Item, dataSource);
  }
}
