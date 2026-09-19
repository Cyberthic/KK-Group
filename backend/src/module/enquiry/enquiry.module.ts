import { Module } from '@nestjs/common';
import { EnquiryController } from './enquiry.controller';
import { EnquiryService } from './enquiry.service';
import { EnquiryRepository } from './enquiry.repository';
import { PrismaModule } from '../../database';

@Module({
  imports: [PrismaModule],
  controllers: [EnquiryController],
  providers: [EnquiryService, EnquiryRepository],
  exports: [EnquiryService, EnquiryRepository],
})
export class EnquiryModule {}
