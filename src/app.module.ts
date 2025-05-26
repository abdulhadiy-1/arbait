import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RegionModule } from './region/region.module';
import { PrismaModule } from './prisma/prisma.module';
import { DistrictModule } from './district/district.module';
import { LevelModule } from './level/level.module';
import { BrandModule } from './brand/brand.module';
import { SizeModule } from './size/size.module';
import { CapacityModule } from './capacity/capacity.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { MailerModule } from './mailer/mailer.module';
import { ToolModule } from './tool/tool.module';
import { ProductModule } from './product/product.module';
import { MasterModule } from './master/master.module';
import { OrderModule } from './order/order.module';

@Module({
  imports: [RegionModule, PrismaModule, DistrictModule, LevelModule, BrandModule, SizeModule, CapacityModule, UserModule, AuthModule, MailerModule, ToolModule, ProductModule, MasterModule, OrderModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
