create table if not exists users
(
    id        serial primary key,
    name      varchar(64)  not null,
    surname   varchar(64)  not null,
    email     varchar(64)           default null,
    telephone varchar(12) unique    default null,
    password  text                  default null
);

create table if not exists houses
(
    id          serial primary key,
    name        varchar(128) not null,
    description text         not null,
    address     varchar(400) not null,
    owner_id    int          not null,

    foreign key (owner_id) references users (id) on delete cascade
);


create table if not exists equipment
(
    id          serial primary key,
    name        varchar(128) not null,
    description text         not null,
    house_id    int          not null,

    foreign key (house_id) references houses (id) on delete cascade
);
