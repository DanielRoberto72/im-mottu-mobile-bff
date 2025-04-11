/* eslint-disable prettier/prettier */
import { Response } from 'express';
import {
  ArgumentsHost,
  BadRequestException,
  ExceptionFilter,
  ForbiddenException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    switch (exception.constructor) {
      case BadRequestException:
        const rawMessages = exception.response?.message;

        const mensagensTratadas = Array.isArray(rawMessages)
          ? rawMessages.map((msg: string) =>
              msg
                .replace(/^character\./i, '')
                .replace(/^cat\./i, '')
                .replace(/^\w+\./i, ''),
            )
          : [];

        return response.status(HttpStatus.BAD_REQUEST).json({
          status: 'erro',
          erro: exception.response.erro ?? 4000,
          mensagem:
            exception.response.mensagem ||
            mensagensTratadas.join(', ') ||
            'Valide os dados e tente novamente',
          timestamp: new Date().toISOString(),
        });
      case UnauthorizedException:
        return response.status(HttpStatus.UNAUTHORIZED).json({
          status: 'erro',
          erro: exception.response.erro ?? 4010,
          mensagem: exception.response.mensagem ?? 'Usuário Não Autorizado',
          timestamp: new Date().toISOString(),
        });
      case ForbiddenException:
        return response.status(HttpStatus.FORBIDDEN).json({
          status: 'erro',
          erro: exception.response.erro ?? 4030,
          mensagem: exception.response.mensagem ?? 'Acesso ao Recurso Negado',
          timestamp: new Date().toISOString(),
        });
      case NotFoundException:
        return response.status(HttpStatus.NOT_FOUND).json({
          status: 'erro',
          erro: exception.response.erro ?? 4040,
          mensagem: exception.response.mensagem ?? 'Recurso não encontrado',
          timestamp: new Date().toISOString(),
        });
      case InternalServerErrorException:
        return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
          status: 'error',
          erro: exception.response.erro ?? 5000,
          mensagem:
            exception.response.mensagem ??
            'Internal Server Error, tente novamente',
          timestamp: new Date().toISOString(),
        });
      default:
        return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
          erro: 99,
          mensagem: 'Erro não mapeado',
          timestamp: new Date().toISOString(),
        });
    }
  }
}
