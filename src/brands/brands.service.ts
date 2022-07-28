import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 } from 'uuid';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { Brand } from './entities/brand.entity';

@Injectable()
export class BrandsService {
  private brands: Brand[] = [
    { id: v4(), name: 'Apple' },
    { id: v4(), name: 'Samsung' },
    { id: v4(), name: 'Xiaomi' },
    { id: v4(), name: 'Huawei' },
    { id: v4(), name: 'Oppo' },
    { id: v4(), name: 'Vivo' },
    { id: v4(), name: 'Asus' },
    { id: v4(), name: 'OnePlus' },
  ];

  create(createBrandDto: CreateBrandDto) {
    const brand: Brand = {
      id: v4(),
      name: createBrandDto.name,
    };

    this.brands.push(brand);
    return brand;
  }

  findAll() {
    return this.brands;
  }

  findOne(id: string) {
    const brand = this.brands.find((brand) => brand.id === id);

    if (!brand) throw new NotFoundException('Brand does not exist');

    return brand;
  }

  update(id: string, updateBrandDto: UpdateBrandDto) {
    let newBrand = this.findOne(id);

    if (!newBrand) throw new NotFoundException('Brand does not exist');

    this.brands = this.brands.map((brand) => {
      if (brand.id === id) {
        newBrand = {
          ...brand,
          ...updateBrandDto,
        };
        return newBrand;
      }

      return brand;
    });

    return newBrand;
  }

  remove(id: string) {
    const car = this.findOne(id);
    if (!car) throw new NotFoundException('brand not found');
    this.brands = this.brands.filter((brand) => brand.id !== id);
  }
}
