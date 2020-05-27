import { EntityRepository, Repository } from 'typeorm';

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';

@EntityRepository(Appointment)
class AppointmentsRepository extends Repository<Appointment> {
  public async findByDate(date: Date): Promise<Appointment | null> {
    const findAppointment = await this.findOne({
      where: { date },
    });

    return findAppointment || null;
  }
}

export default AppointmentsRepository;

/*

REPOSITORY

O Repository é um conceito introduzido no Data Mapper Pattern ou
Repository Pattern que consiste em uma ponte entre nossa aplicação
e a fonte de dados, seja ela um banco de dados, um arquivo físico ou
qualquer outro meio de persistência de dados da aplicação.

Essa implementação visa isolar a forma com que nos comunicamos com
os dados, abstraindo lógicas comuns de operações no banco.

Geralmente o Repository possui os métodos comuns de comunicação com
uma fonte de dados como listagem, busca, criação, edição, remoção,
mas conforme a aplicação cresce o desenvolvedor tende a encontrar
outras operações repetitíveis e, com isso, popula o repositório com
mais funcionalidades.

*/

// FORMA ALTIGA DE UTILIZAR O REPOSITÓRIO SEM BANCO DE DADOS, INTERAGINDO COM ARRAY;

// import { isEqual } from 'date-fns';
// import Appointment from '../models/Appointment';

// // DTO - Data Transfer Object
// interface CreateAppointment {
//   provider: string;
//   date: Date;
// }

// class AppointmentsRepository {
//   private appointments: Appointment[];

//   constructor() {
//     this.appointments = [];
//   }

//   public all(): Appointment[] {
//     return this.appointments;
//   }

//   // Procura por um agendamento com a mesma data e retorna o objeto Appointment ou nulo
//   public findByDate(date: Date): Appointment | null {
//     const findAppointment = this.appointments.find(appointment =>
//       isEqual(date, appointment.date),
//     );

//     return findAppointment || null;
//   }

//   // Cria um novo agendamento no repositório
//   public create({ provider, date }: CreateAppointment): Appointment {
//     const appointment = new Appointment({ provider, date });
//     this.appointments.push(appointment);
//     return appointment;
//   }
// }

// export default AppointmentsRepository;

/*

EXEMPLO REAL

Imagine uma aplicação que controla reserva de quartos em um hotel,
uma pessoa pode acessar o site, reservar um quarto e pagar pelo mesmo.
Essa reserva depende do quarto estar vago para esse intervalo de datas
que o usuário selecionar.

Se pensarmos nisso como uma consulta no banco, precisaremos realizar
uma query um pouco complexa onde comparamos a data de entrada e saída
com outras reservas já existentes na aplicação, buscando a disponibilidade
do quarto.

Em um cenário real, essa busca por disponibilidade de um quarto pode ser
feita em várias partes da aplicação, a home page do site pode possuir uma
busca prévia de disponibilidade, a reserva precisa verificar a
disponibilidade, o atendente do hotel precisa conseguir verificar
disponibilidade para reservas no balcão, ou seja, uma mesma query no
banco de dados sendo utilizada em múltiplos contextos, por isso criamos
isso em um Repository, reaproveitamento.

*/
