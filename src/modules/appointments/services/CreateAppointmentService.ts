import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import AppointmentsRepository from '@modules/appointments/repositories/AppointmentsRepository';
import AppError from '@shared/errors/AppError';

interface Request {
  provider_id: string;
  date: Date;
}

class CreateAppointmentService {
  public async execute({ provider_id, date }: Request): Promise<Appointment> {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);

    const appointmentDate = startOfHour(date);

    const findAppointmentInSameDate = await appointmentsRepository.findByDate(
      appointmentDate,
    );

    if (findAppointmentInSameDate) {
      throw new AppError('This appointment is already booked');
    }

    const appointment = appointmentsRepository.create({
      provider_id,
      date: appointmentDate,
    });

    await appointmentsRepository.save(appointment);

    return appointment;
  }
}

export default CreateAppointmentService;

/*

Service

O Service é um conceito introduzido no Service Pattern. Ele tem como
objetivo abstrair regras de negócio das rotas, além de tornar nosso
código mais reutilizável.

No contexto da nossa jornada, essa implementação visa reduzir a
complexidade das rotas da nossa aplicação e deixá-las responsáveis
apenas pelo que realmente devem fazer: receber uma requisição,
repassar os dados da requisição a outro arquivo e devolver uma
resposta.

O Service deve ter um nome descritivo
(ex.: updateDeliveryManProfileService) e **sempre** possuir
apenas **um** método (ex.: execute()). Além disso, caso outra
rota ou arquivo precise executar essa  mesma ação, basta chamar
e executar esse Service, obedecedo assim a outro importante
princípio: DRY (Don't Repeat Yourself).

*/

/*

Exemplo real

Imagine a mesma aplicação que controla a reserva de quartos em
um hotel. Essa reserva pode pode envolver diversas etapas, como
verificação da disponibilidade, realização do pagamento, envio
de emails, entre outros.

Dessa forma, a simples ação de reservar um quarto irá
desencadear em diversas outras ações. Se pensarmos nisso como
código, teremos regras de negócio, que não são de responsabilidade
do Repository, diretamente na nossa rota. Isso fere alguns
princípios de programação como o Single Responsability Principle
e, portanto, os Services são criados para serem os responsáveis
por realizar essas ações.

Além disso, imagine que em outras ações como consumir produtos
do Hotel seja necessário executar algumas ações novamente,
como realizar o pagamento. Com o Service criado, basta chamá-lo
e executá-lo novamente.

*/
