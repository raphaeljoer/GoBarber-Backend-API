# Recuração de senha

**RF** Requisitos funcionais

- O usuário deve poder recuperar sua senha informando o seu email;
- O usuário deve receber um e-mail com instruções de recuperação de senha;
- O usuário deve poder resetar sua senha;

**RNF** Requisitos Não Funcionais

- Utilizar o Mailtrap para realizar testar emails em desenvolvimento;
- Utilizar Amazon SES para envios em produção;
- O envio de e-mails deve acontecer em segundo plano (background job);


**RN** Regras de Negócios

- O link enviado por email para resetar a senha deve expirar em 2h;
- O usuário precisa confirmar a nova senha ao resetar sua senha;
- A nova senha não pode ser igual a antiga senha

# Atualização do perfil

**RF** Requisitos funcionais

- O usuário deve poder atualizar seu perfil: nome, email, senha;

**RNF** Requisitos Não Funcionais

**RN** Regras de Negócios

- o usuário não pode alterar seu email para um email já utilizado;
- Para atualizar sua senha o usuário deve informar a senha antiga;
- Para atualizar sua senha o usuário precisa confirmar a nova senha;

# Painel do prestador

**RF** Requisitos funcionais

- O prestador deve poder listar seus agendamentos de um dia específico;
- O prestador deve receber uma notificação sem que houver um novo agendamento;
- O prestador deve poder visualizar as notificações não lidas;

**RNF** Requisitos Não Funcionais

- Os agendamentos do prestador no dia devem ser armazenados em cache;
- As notificações do prestador devem ser armazenadas no MongoDB;
- As notificações do prestador devem ser enviadas em tempo-real utilizando Socket.io;

**RN** Regras de Negócios

- A notificação deve ter um status de lida ou não-lida;

# Agendamento de serviços

**RF** Requisitos funcionais

- O usuário deve poder listar todos os prestadores de serviços cadastrados;
- O usuário deve poder visualizar os dias de um mês com pelo menos um horário disponível de um prestador;
- O usuário deve poder listar horários disponiveis em um dia específico de um prestador
- O usuário deve poder realizar um novo agendamento com um prestador;

**RNF** Requisitos Não Funcionais

- A listagem de prestadores deve ser armazenada em cache;

**RN** Regras de Negócios

- Cada agendamento deve durar 1h exatamente;
- Os agendamentos devem estar disponíveis entre 08h às 18h (Primeiro às 08h e o último às 17h);
- O usuário não pode agendar em horário já ocupado;
- O usuário não pode agendar em um horário que já passou;
- O usuário não pode agendar serviços consigo mesmo;
