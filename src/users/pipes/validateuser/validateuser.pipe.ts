import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';

@Injectable()
export class ValidateUserPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    const numericValue = parseInt(value, 10);

    if (isNaN(numericValue)) {
      throw new BadRequestException(
        `El valor '${value}' no es un número válido para el parámetro '${metadata.data}'`,
      );
    }

    if (numericValue <= 0) {
      throw new BadRequestException(
        `El valor '${value}' debe ser un número positivo para el parámetro '${metadata.data}'`,
      );
    }

    return numericValue;
  }
}
