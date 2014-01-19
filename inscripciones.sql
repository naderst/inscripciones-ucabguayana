--
-- PostgreSQL database dump
--

-- Dumped from database version 9.3.2
-- Dumped by pg_dump version 9.3.2
-- Started on 2014-01-18 21:25:30 VET

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;

--
-- TOC entry 184 (class 3079 OID 11760)
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- TOC entry 2067 (class 0 OID 0)
-- Dependencies: 184
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET search_path = public, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- TOC entry 170 (class 1259 OID 17601)
-- Name: alumnos; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE alumnos (
    id_alumno integer NOT NULL,
    nombre_alumno character varying(30) NOT NULL,
    apellido_alumno character varying(30) NOT NULL,
    carrera_alumno character varying(10) NOT NULL,
    correo_alumno character varying(150) NOT NULL,
    suficiencia_ingles boolean NOT NULL,
    clave character varying,
    CONSTRAINT alumnos_carrera_alumno_check CHECK (((carrera_alumno)::text = 'inginf'::text)),
    CONSTRAINT alumnos_id_alumno_check CHECK ((id_alumno > 0))
);


ALTER TABLE public.alumnos OWNER TO postgres;

--
-- TOC entry 171 (class 1259 OID 17609)
-- Name: alumnos_x_holds; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE alumnos_x_holds (
    id_alumno integer NOT NULL,
    id_hold integer NOT NULL
);


ALTER TABLE public.alumnos_x_holds OWNER TO postgres;

--
-- TOC entry 172 (class 1259 OID 17612)
-- Name: cuentas_x_profesores; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE cuentas_x_profesores (
    id_profesor integer NOT NULL,
    clave character varying
);


ALTER TABLE public.cuentas_x_profesores OWNER TO postgres;

--
-- TOC entry 173 (class 1259 OID 17618)
-- Name: holds; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE holds (
    id_hold integer NOT NULL,
    nombre_hold character varying(30) NOT NULL,
    descripcion_hold character varying(50)
);


ALTER TABLE public.holds OWNER TO postgres;

--
-- TOC entry 174 (class 1259 OID 17621)
-- Name: lapsos; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE lapsos (
    lapso integer NOT NULL
);


ALTER TABLE public.lapsos OWNER TO postgres;

--
-- TOC entry 175 (class 1259 OID 17624)
-- Name: materias; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE materias (
    id_materia integer NOT NULL,
    creditos_materia integer NOT NULL,
    nombre_materia character varying NOT NULL,
    tipo_materia character(2) NOT NULL,
    semestre integer,
    CONSTRAINT materias_tipo_materia_check CHECK ((((tipo_materia = 'ob'::bpchar) OR (tipo_materia = 'ne'::bpchar)) OR (tipo_materia = 'el'::bpchar)))
);


ALTER TABLE public.materias OWNER TO postgres;

--
-- TOC entry 176 (class 1259 OID 17631)
-- Name: materias_x_alumnos; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE materias_x_alumnos (
    id_materia integer NOT NULL,
    id_alumno integer NOT NULL,
    lapso integer NOT NULL,
    nota character varying,
    seccion integer NOT NULL,
    CONSTRAINT materias_x_alumnos_nota_check CHECK (((((nota)::text = 'ap'::text) OR ((nota)::text = 'rp'::text)) OR (((nota)::integer > 0) AND ((nota)::integer <= 20))))
);


ALTER TABLE public.materias_x_alumnos OWNER TO postgres;

--
-- TOC entry 177 (class 1259 OID 17638)
-- Name: materias_x_profesores; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE materias_x_profesores (
    id_materia integer NOT NULL,
    id_profesor integer NOT NULL,
    lapso integer NOT NULL,
    seccion integer NOT NULL,
    CONSTRAINT materias_x_profesores_check CHECK (((lapso > 0) AND (seccion > 0)))
);


ALTER TABLE public.materias_x_profesores OWNER TO postgres;

--
-- TOC entry 178 (class 1259 OID 17642)
-- Name: materias_x_salon; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE materias_x_salon (
    id_materia integer NOT NULL,
    id_salon character varying(10) NOT NULL,
    hora_inicio character varying NOT NULL,
    lapso integer NOT NULL,
    seccion integer NOT NULL,
    dia character(1) NOT NULL,
    hora_fin character varying NOT NULL,
    CONSTRAINT materias_x_salon_dia_check CHECK ((((((((dia)::text = 'l'::text) OR ((dia)::text = 'm'::text)) OR ((dia)::text = 'i'::text)) OR ((dia)::text = 'j'::text)) OR ((dia)::text = 'v'::text)) OR ((dia)::text = 's'::text)))
);


ALTER TABLE public.materias_x_salon OWNER TO postgres;

--
-- TOC entry 179 (class 1259 OID 17649)
-- Name: notificaciones; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE notificaciones (
    id_alumno integer NOT NULL,
    mensaje character varying(500) NOT NULL
);


ALTER TABLE public.notificaciones OWNER TO postgres;

--
-- TOC entry 180 (class 1259 OID 17652)
-- Name: prelaciones_materias; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE prelaciones_materias (
    id_materia_preladora integer NOT NULL,
    id_materia_prelada integer NOT NULL
);


ALTER TABLE public.prelaciones_materias OWNER TO postgres;

--
-- TOC entry 181 (class 1259 OID 17655)
-- Name: prelaciones_numericas; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE prelaciones_numericas (
    id_materia_prelada integer NOT NULL,
    creditos_prelacion integer NOT NULL,
    CONSTRAINT prelaciones_numericas_creditos_prelacion_check CHECK ((creditos_prelacion > 0))
);


ALTER TABLE public.prelaciones_numericas OWNER TO postgres;

--
-- TOC entry 182 (class 1259 OID 17659)
-- Name: profesores; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE profesores (
    id_profesor integer NOT NULL,
    nombre_profesor character varying(30) NOT NULL,
    apellido_profesor character varying(30) NOT NULL,
    CONSTRAINT profesores_id_profesor_check CHECK ((id_profesor > 0))
);


ALTER TABLE public.profesores OWNER TO postgres;

--
-- TOC entry 183 (class 1259 OID 17663)
-- Name: salones; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE salones (
    id_salon character varying(10) NOT NULL,
    capacidad_salon integer DEFAULT 50 NOT NULL,
    ubicacion_salon character varying(50),
    CONSTRAINT salones_capacidad_salon_check CHECK ((capacidad_salon > 0))
);


ALTER TABLE public.salones OWNER TO postgres;

--
-- TOC entry 2046 (class 0 OID 17601)
-- Dependencies: 170
-- Data for Name: alumnos; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO alumnos (id_alumno, nombre_alumno, apellido_alumno, carrera_alumno, correo_alumno, suficiencia_ingles, clave) VALUES (22588454, 'Jose', 'Saad', 'inginf', 'joseitosk@hotmail.com', true, 'a688a47ac73fb58ce3828bcb184cb157');
INSERT INTO alumnos (id_alumno, nombre_alumno, apellido_alumno, carrera_alumno, correo_alumno, suficiencia_ingles, clave) VALUES (20773762, 'Nader', 'Abu Fakhr', 'inginf', 'naderst@gmail.com', true, '4297f44b13955235245b2497399d7a93');


--
-- TOC entry 2047 (class 0 OID 17609)
-- Dependencies: 171
-- Data for Name: alumnos_x_holds; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 2048 (class 0 OID 17612)
-- Dependencies: 172
-- Data for Name: cuentas_x_profesores; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO cuentas_x_profesores (id_profesor, clave) VALUES (7, '4297f44b13955235245b2497399d7a93');


--
-- TOC entry 2049 (class 0 OID 17618)
-- Dependencies: 173
-- Data for Name: holds; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO holds (id_hold, nombre_hold, descripcion_hold) VALUES (1, 'Mora', 'Alumno Moroso');
INSERT INTO holds (id_hold, nombre_hold, descripcion_hold) VALUES (2, 'Papeles', 'Papeles incompletos');


--
-- TOC entry 2050 (class 0 OID 17621)
-- Dependencies: 174
-- Data for Name: lapsos; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO lapsos (lapso) VALUES (201322);
INSERT INTO lapsos (lapso) VALUES (201421);
INSERT INTO lapsos (lapso) VALUES (201321);
INSERT INTO lapsos (lapso) VALUES (201222);
INSERT INTO lapsos (lapso) VALUES (201221);
INSERT INTO lapsos (lapso) VALUES (201122);
INSERT INTO lapsos (lapso) VALUES (201121);


--
-- TOC entry 2051 (class 0 OID 17624)
-- Dependencies: 175
-- Data for Name: materias; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO materias (id_materia, creditos_materia, nombre_materia, tipo_materia, semestre) VALUES (6406, 0, 'Seminario de Servicio Comunitario', 'ob', 6);
INSERT INTO materias (id_materia, creditos_materia, nombre_materia, tipo_materia, semestre) VALUES (6405, 4, 'Sistemas de Bases de Datos I', 'ob', 6);
INSERT INTO materias (id_materia, creditos_materia, nombre_materia, tipo_materia, semestre) VALUES (6404, 5, 'Redes de Computador I', 'ob', 6);
INSERT INTO materias (id_materia, creditos_materia, nombre_materia, tipo_materia, semestre) VALUES (6403, 5, 'Arquitectura del Computador', 'ob', 6);
INSERT INTO materias (id_materia, creditos_materia, nombre_materia, tipo_materia, semestre) VALUES (6402, 4, 'Probabilidades y Estadistica', 'ob', 6);
INSERT INTO materias (id_materia, creditos_materia, nombre_materia, tipo_materia, semestre) VALUES (6401, 4, 'Metodos Numericos', 'ob', 6);
INSERT INTO materias (id_materia, creditos_materia, nombre_materia, tipo_materia, semestre) VALUES (5405, 3, 'Economia General', 'ob', 5);
INSERT INTO materias (id_materia, creditos_materia, nombre_materia, tipo_materia, semestre) VALUES (5404, 4, 'Ingenieria del Software', 'ob', 5);
INSERT INTO materias (id_materia, creditos_materia, nombre_materia, tipo_materia, semestre) VALUES (5403, 4, 'Sistemas de Operacion', 'ob', 5);
INSERT INTO materias (id_materia, creditos_materia, nombre_materia, tipo_materia, semestre) VALUES (5402, 5, 'Circuitos Electronicos', 'ob', 5);
INSERT INTO materias (id_materia, creditos_materia, nombre_materia, tipo_materia, semestre) VALUES (5401, 5, 'Calculo IV', 'ob', 5);
INSERT INTO materias (id_materia, creditos_materia, nombre_materia, tipo_materia, semestre) VALUES (4406, 2, 'Humanidades III', 'ob', 4);
INSERT INTO materias (id_materia, creditos_materia, nombre_materia, tipo_materia, semestre) VALUES (4405, 5, 'Algoritmos y Progrmacion III', 'ob', 4);
INSERT INTO materias (id_materia, creditos_materia, nombre_materia, tipo_materia, semestre) VALUES (4404, 4, 'Estructura del Computador', 'ob', 4);
INSERT INTO materias (id_materia, creditos_materia, nombre_materia, tipo_materia, semestre) VALUES (4403, 5, 'Fisica General II', 'ob', 4);
INSERT INTO materias (id_materia, creditos_materia, nombre_materia, tipo_materia, semestre) VALUES (4402, 1, 'Laboratorio de Fisica', 'ob', 4);
INSERT INTO materias (id_materia, creditos_materia, nombre_materia, tipo_materia, semestre) VALUES (4401, 5, 'Calculo III', 'ob', 4);
INSERT INTO materias (id_materia, creditos_materia, nombre_materia, tipo_materia, semestre) VALUES (3405, 2, 'Humanidades II', 'ob', 3);
INSERT INTO materias (id_materia, creditos_materia, nombre_materia, tipo_materia, semestre) VALUES (3404, 5, 'Algoritmos y Programacion II', 'ob', 3);
INSERT INTO materias (id_materia, creditos_materia, nombre_materia, tipo_materia, semestre) VALUES (3403, 4, 'Matematicas Discretas', 'ob', 3);
INSERT INTO materias (id_materia, creditos_materia, nombre_materia, tipo_materia, semestre) VALUES (3402, 5, 'Fisica General I', 'ob', 3);
INSERT INTO materias (id_materia, creditos_materia, nombre_materia, tipo_materia, semestre) VALUES (3401, 6, 'Claculo II', 'ob', 3);
INSERT INTO materias (id_materia, creditos_materia, nombre_materia, tipo_materia, semestre) VALUES (2404, 2, 'Humanidades I', 'ob', 2);
INSERT INTO materias (id_materia, creditos_materia, nombre_materia, tipo_materia, semestre) VALUES (2403, 5, 'Algoritmos y Programacion I', 'ob', 2);
INSERT INTO materias (id_materia, creditos_materia, nombre_materia, tipo_materia, semestre) VALUES (2402, 4, 'Logica Computacional', 'ob', 2);
INSERT INTO materias (id_materia, creditos_materia, nombre_materia, tipo_materia, semestre) VALUES (2401, 7, 'Calculo I', 'ob', 2);
INSERT INTO materias (id_materia, creditos_materia, nombre_materia, tipo_materia, semestre) VALUES (1401, 3, 'Trigonometria', 'ob', 1);
INSERT INTO materias (id_materia, creditos_materia, nombre_materia, tipo_materia, semestre) VALUES (1402, 6, 'Matematica Basica', 'ob', 1);
INSERT INTO materias (id_materia, creditos_materia, nombre_materia, tipo_materia, semestre) VALUES (1403, 4, 'Introduccion a la Informatica', 'ob', 1);
INSERT INTO materias (id_materia, creditos_materia, nombre_materia, tipo_materia, semestre) VALUES (1404, 4, 'Lenguaje y Comunicacion', 'ob', 1);
INSERT INTO materias (id_materia, creditos_materia, nombre_materia, tipo_materia, semestre) VALUES (7401, 3, 'Computacion Grafica', 'ob', 7);
INSERT INTO materias (id_materia, creditos_materia, nombre_materia, tipo_materia, semestre) VALUES (7402, 5, 'Redes de Computadores II', 'ob', 7);
INSERT INTO materias (id_materia, creditos_materia, nombre_materia, tipo_materia, semestre) VALUES (7403, 4, 'Metodologia del Software', 'ob', 7);
INSERT INTO materias (id_materia, creditos_materia, nombre_materia, tipo_materia, semestre) VALUES (7404, 4, 'Sistemas de Bases de Datos II', 'ob', 7);
INSERT INTO materias (id_materia, creditos_materia, nombre_materia, tipo_materia, semestre) VALUES (7405, 4, 'Contabilidad General', 'ob', 7);
INSERT INTO materias (id_materia, creditos_materia, nombre_materia, tipo_materia, semestre) VALUES (8401, 4, 'Investigacion de Operaciones I', 'ob', 8);
INSERT INTO materias (id_materia, creditos_materia, nombre_materia, tipo_materia, semestre) VALUES (8402, 4, 'Seguridad Computacional', 'ob', 8);
INSERT INTO materias (id_materia, creditos_materia, nombre_materia, tipo_materia, semestre) VALUES (8403, 4, 'Sistemas Distribuidos', 'ob', 8);
INSERT INTO materias (id_materia, creditos_materia, nombre_materia, tipo_materia, semestre) VALUES (8405, 4, 'Desarrollo del Software', 'ob', 8);
INSERT INTO materias (id_materia, creditos_materia, nombre_materia, tipo_materia, semestre) VALUES (8404, 0, 'Seminario de Trabajo de Grado', 'ob', 8);
INSERT INTO materias (id_materia, creditos_materia, nombre_materia, tipo_materia, semestre) VALUES (8406, 3, 'Analisis de Inversiones', 'ob', 8);
INSERT INTO materias (id_materia, creditos_materia, nombre_materia, tipo_materia, semestre) VALUES (9401, 2, 'Etica y Ejercicio Profesional', 'ob', 9);
INSERT INTO materias (id_materia, creditos_materia, nombre_materia, tipo_materia, semestre) VALUES (9402, 3, 'Investigacion de Operaciones II', 'ob', 9);
INSERT INTO materias (id_materia, creditos_materia, nombre_materia, tipo_materia, semestre) VALUES (9403, 3, 'Multimedia y Aplicaciones Web', 'ob', 9);
INSERT INTO materias (id_materia, creditos_materia, nombre_materia, tipo_materia, semestre) VALUES (9404, 4, 'Redes de Computador III', 'ob', 9);
INSERT INTO materias (id_materia, creditos_materia, nombre_materia, tipo_materia, semestre) VALUES (10401, 3, 'Evaluacion de Sistemas Informaticos', 'ob', 10);
INSERT INTO materias (id_materia, creditos_materia, nombre_materia, tipo_materia, semestre) VALUES (10404, 5, 'Gestion de Proyectos de Software', 'ob', 10);
INSERT INTO materias (id_materia, creditos_materia, nombre_materia, tipo_materia, semestre) VALUES (10402, 10, 'Trabajo Instrumental de Grado', 'ne', 10);
INSERT INTO materias (id_materia, creditos_materia, nombre_materia, tipo_materia, semestre) VALUES (10403, 10, 'Trabajo Especial de Grado', 'ne', 10);
INSERT INTO materias (id_materia, creditos_materia, nombre_materia, tipo_materia, semestre) VALUES (9405, 3, 'Pasantia', 'ne', 9);
INSERT INTO materias (id_materia, creditos_materia, nombre_materia, tipo_materia, semestre) VALUES (7406, 0, 'Servicio Comunitario', 'ne', 7);


--
-- TOC entry 2052 (class 0 OID 17631)
-- Dependencies: 176
-- Data for Name: materias_x_alumnos; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO materias_x_alumnos (id_materia, id_alumno, lapso, nota, seccion) VALUES (6403, 20773762, 201322, '16', 401);
INSERT INTO materias_x_alumnos (id_materia, id_alumno, lapso, nota, seccion) VALUES (6405, 20773762, 201322, '18', 401);
INSERT INTO materias_x_alumnos (id_materia, id_alumno, lapso, nota, seccion) VALUES (6406, 20773762, 201322, 'ap', 401);
INSERT INTO materias_x_alumnos (id_materia, id_alumno, lapso, nota, seccion) VALUES (7401, 20773762, 201322, '18', 401);
INSERT INTO materias_x_alumnos (id_materia, id_alumno, lapso, nota, seccion) VALUES (7405, 20773762, 201322, '18', 401);
INSERT INTO materias_x_alumnos (id_materia, id_alumno, lapso, nota, seccion) VALUES (6404, 20773762, 201322, '19', 401);
INSERT INTO materias_x_alumnos (id_materia, id_alumno, lapso, nota, seccion) VALUES (5402, 20773762, 201321, '17', 401);
INSERT INTO materias_x_alumnos (id_materia, id_alumno, lapso, nota, seccion) VALUES (5403, 20773762, 201321, '17', 401);
INSERT INTO materias_x_alumnos (id_materia, id_alumno, lapso, nota, seccion) VALUES (5404, 20773762, 201321, '18', 401);
INSERT INTO materias_x_alumnos (id_materia, id_alumno, lapso, nota, seccion) VALUES (5405, 20773762, 201321, '19', 401);
INSERT INTO materias_x_alumnos (id_materia, id_alumno, lapso, nota, seccion) VALUES (6401, 20773762, 201321, '20', 401);
INSERT INTO materias_x_alumnos (id_materia, id_alumno, lapso, nota, seccion) VALUES (6402, 20773762, 201321, '16', 401);
INSERT INTO materias_x_alumnos (id_materia, id_alumno, lapso, nota, seccion) VALUES (4402, 20773762, 201222, '19', 401);
INSERT INTO materias_x_alumnos (id_materia, id_alumno, lapso, nota, seccion) VALUES (4403, 20773762, 201222, '19', 401);
INSERT INTO materias_x_alumnos (id_materia, id_alumno, lapso, nota, seccion) VALUES (4404, 20773762, 201222, '17', 401);
INSERT INTO materias_x_alumnos (id_materia, id_alumno, lapso, nota, seccion) VALUES (4405, 20773762, 201222, '18', 401);
INSERT INTO materias_x_alumnos (id_materia, id_alumno, lapso, nota, seccion) VALUES (5401, 20773762, 201222, '18', 401);
INSERT INTO materias_x_alumnos (id_materia, id_alumno, lapso, nota, seccion) VALUES (3402, 20773762, 201221, '20', 401);
INSERT INTO materias_x_alumnos (id_materia, id_alumno, lapso, nota, seccion) VALUES (3403, 20773762, 201221, '18', 401);
INSERT INTO materias_x_alumnos (id_materia, id_alumno, lapso, nota, seccion) VALUES (3404, 20773762, 201221, '12', 401);
INSERT INTO materias_x_alumnos (id_materia, id_alumno, lapso, nota, seccion) VALUES (4406, 20773762, 201221, '18', 401);
INSERT INTO materias_x_alumnos (id_materia, id_alumno, lapso, nota, seccion) VALUES (4401, 20773762, 201221, '18', 401);
INSERT INTO materias_x_alumnos (id_materia, id_alumno, lapso, nota, seccion) VALUES (2402, 20773762, 201122, '19', 401);
INSERT INTO materias_x_alumnos (id_materia, id_alumno, lapso, nota, seccion) VALUES (2403, 20773762, 201122, '19', 401);
INSERT INTO materias_x_alumnos (id_materia, id_alumno, lapso, nota, seccion) VALUES (3401, 20773762, 201122, '19', 401);
INSERT INTO materias_x_alumnos (id_materia, id_alumno, lapso, nota, seccion) VALUES (3405, 20773762, 201122, '19', 401);
INSERT INTO materias_x_alumnos (id_materia, id_alumno, lapso, nota, seccion) VALUES (1401, 20773762, 201121, 'ap', 401);
INSERT INTO materias_x_alumnos (id_materia, id_alumno, lapso, nota, seccion) VALUES (1402, 20773762, 201121, 'ap', 401);
INSERT INTO materias_x_alumnos (id_materia, id_alumno, lapso, nota, seccion) VALUES (1403, 20773762, 201121, '19', 401);
INSERT INTO materias_x_alumnos (id_materia, id_alumno, lapso, nota, seccion) VALUES (1404, 20773762, 201121, '20', 401);
INSERT INTO materias_x_alumnos (id_materia, id_alumno, lapso, nota, seccion) VALUES (2401, 20773762, 201121, '20', 401);
INSERT INTO materias_x_alumnos (id_materia, id_alumno, lapso, nota, seccion) VALUES (2404, 20773762, 201121, '20', 401);
INSERT INTO materias_x_alumnos (id_materia, id_alumno, lapso, nota, seccion) VALUES (7406, 20773762, 201322, 'ap', 401);
INSERT INTO materias_x_alumnos (id_materia, id_alumno, lapso, nota, seccion) VALUES (7404, 20773762, 201421, NULL, 401);
INSERT INTO materias_x_alumnos (id_materia, id_alumno, lapso, nota, seccion) VALUES (7403, 20773762, 201421, NULL, 401);
INSERT INTO materias_x_alumnos (id_materia, id_alumno, lapso, nota, seccion) VALUES (7402, 20773762, 201421, NULL, 401);
INSERT INTO materias_x_alumnos (id_materia, id_alumno, lapso, nota, seccion) VALUES (8402, 20773762, 201421, NULL, 401);
INSERT INTO materias_x_alumnos (id_materia, id_alumno, lapso, nota, seccion) VALUES (8406, 20773762, 201421, NULL, 401);
INSERT INTO materias_x_alumnos (id_materia, id_alumno, lapso, nota, seccion) VALUES (8401, 20773762, 201421, NULL, 401);


--
-- TOC entry 2053 (class 0 OID 17638)
-- Dependencies: 177
-- Data for Name: materias_x_profesores; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO materias_x_profesores (id_materia, id_profesor, lapso, seccion) VALUES (6403, 15, 201322, 401);
INSERT INTO materias_x_profesores (id_materia, id_profesor, lapso, seccion) VALUES (6404, 24, 201322, 401);
INSERT INTO materias_x_profesores (id_materia, id_profesor, lapso, seccion) VALUES (6405, 25, 201322, 401);
INSERT INTO materias_x_profesores (id_materia, id_profesor, lapso, seccion) VALUES (6406, 28, 201322, 401);
INSERT INTO materias_x_profesores (id_materia, id_profesor, lapso, seccion) VALUES (7401, 12, 201322, 401);
INSERT INTO materias_x_profesores (id_materia, id_profesor, lapso, seccion) VALUES (7405, 26, 201322, 401);
INSERT INTO materias_x_profesores (id_materia, id_profesor, lapso, seccion) VALUES (7406, 28, 201322, 401);
INSERT INTO materias_x_profesores (id_materia, id_profesor, lapso, seccion) VALUES (5402, 19, 201321, 401);
INSERT INTO materias_x_profesores (id_materia, id_profesor, lapso, seccion) VALUES (5403, 20, 201321, 401);
INSERT INTO materias_x_profesores (id_materia, id_profesor, lapso, seccion) VALUES (5404, 21, 201321, 401);
INSERT INTO materias_x_profesores (id_materia, id_profesor, lapso, seccion) VALUES (5405, 22, 201321, 401);
INSERT INTO materias_x_profesores (id_materia, id_profesor, lapso, seccion) VALUES (6401, 1, 201321, 401);
INSERT INTO materias_x_profesores (id_materia, id_profesor, lapso, seccion) VALUES (6402, 23, 201321, 401);
INSERT INTO materias_x_profesores (id_materia, id_profesor, lapso, seccion) VALUES (4402, 14, 201222, 401);
INSERT INTO materias_x_profesores (id_materia, id_profesor, lapso, seccion) VALUES (4403, 14, 201222, 401);
INSERT INTO materias_x_profesores (id_materia, id_profesor, lapso, seccion) VALUES (4404, 15, 201222, 401);
INSERT INTO materias_x_profesores (id_materia, id_profesor, lapso, seccion) VALUES (4405, 16, 201222, 401);
INSERT INTO materias_x_profesores (id_materia, id_profesor, lapso, seccion) VALUES (5401, 18, 201222, 401);
INSERT INTO materias_x_profesores (id_materia, id_profesor, lapso, seccion) VALUES (3402, 10, 201221, 401);
INSERT INTO materias_x_profesores (id_materia, id_profesor, lapso, seccion) VALUES (3403, 11, 201221, 401);
INSERT INTO materias_x_profesores (id_materia, id_profesor, lapso, seccion) VALUES (3404, 12, 201221, 401);
INSERT INTO materias_x_profesores (id_materia, id_profesor, lapso, seccion) VALUES (4401, 1, 201221, 401);
INSERT INTO materias_x_profesores (id_materia, id_profesor, lapso, seccion) VALUES (4406, 17, 201221, 401);
INSERT INTO materias_x_profesores (id_materia, id_profesor, lapso, seccion) VALUES (2402, 6, 201122, 401);
INSERT INTO materias_x_profesores (id_materia, id_profesor, lapso, seccion) VALUES (2403, 7, 201122, 401);
INSERT INTO materias_x_profesores (id_materia, id_profesor, lapso, seccion) VALUES (3401, 9, 201122, 401);
INSERT INTO materias_x_profesores (id_materia, id_profesor, lapso, seccion) VALUES (3405, 13, 201122, 401);
INSERT INTO materias_x_profesores (id_materia, id_profesor, lapso, seccion) VALUES (1401, 1, 201121, 401);
INSERT INTO materias_x_profesores (id_materia, id_profesor, lapso, seccion) VALUES (1402, 2, 201121, 401);
INSERT INTO materias_x_profesores (id_materia, id_profesor, lapso, seccion) VALUES (1403, 3, 201121, 401);
INSERT INTO materias_x_profesores (id_materia, id_profesor, lapso, seccion) VALUES (1404, 4, 201121, 401);
INSERT INTO materias_x_profesores (id_materia, id_profesor, lapso, seccion) VALUES (2401, 5, 201121, 401);
INSERT INTO materias_x_profesores (id_materia, id_profesor, lapso, seccion) VALUES (2404, 8, 201121, 401);
INSERT INTO materias_x_profesores (id_materia, id_profesor, lapso, seccion) VALUES (7402, 27, 201421, 401);
INSERT INTO materias_x_profesores (id_materia, id_profesor, lapso, seccion) VALUES (7403, 28, 201421, 401);
INSERT INTO materias_x_profesores (id_materia, id_profesor, lapso, seccion) VALUES (7404, 29, 201421, 401);
INSERT INTO materias_x_profesores (id_materia, id_profesor, lapso, seccion) VALUES (8401, 7, 201421, 401);
INSERT INTO materias_x_profesores (id_materia, id_profesor, lapso, seccion) VALUES (8402, 27, 201421, 401);
INSERT INTO materias_x_profesores (id_materia, id_profesor, lapso, seccion) VALUES (8406, 30, 201421, 401);


--
-- TOC entry 2054 (class 0 OID 17642)
-- Dependencies: 178
-- Data for Name: materias_x_salon; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO materias_x_salon (id_materia, id_salon, hora_inicio, lapso, seccion, dia, hora_fin) VALUES (7402, 'A2-11', '3:00 p.m.', 201421, 401, 'l', '5:00 p.m.');
INSERT INTO materias_x_salon (id_materia, id_salon, hora_inicio, lapso, seccion, dia, hora_fin) VALUES (7402, 'AR-24', '11:00 a.m.', 201421, 401, 'i', '1:00 p.m.');
INSERT INTO materias_x_salon (id_materia, id_salon, hora_inicio, lapso, seccion, dia, hora_fin) VALUES (7402, 'LAB-BD', '4:00 p.m.', 201421, 401, 'v', '6:00 p.m.');
INSERT INTO materias_x_salon (id_materia, id_salon, hora_inicio, lapso, seccion, dia, hora_fin) VALUES (7403, 'A2-11', '2:00 p.m.', 201421, 401, 'm', '4:00 p.m.');
INSERT INTO materias_x_salon (id_materia, id_salon, hora_inicio, lapso, seccion, dia, hora_fin) VALUES (7403, 'A2-12', '9:00 a.m.', 201421, 401, 'v', '11:00 a.m.');
INSERT INTO materias_x_salon (id_materia, id_salon, hora_inicio, lapso, seccion, dia, hora_fin) VALUES (7404, 'A2-11', '7:00 p.m.', 201421, 401, 'l', '9:00 p.m.');
INSERT INTO materias_x_salon (id_materia, id_salon, hora_inicio, lapso, seccion, dia, hora_fin) VALUES (7404, 'AR-21', '5:00 p.m.', 201421, 401, 'i', '7:00 p.m.');
INSERT INTO materias_x_salon (id_materia, id_salon, hora_inicio, lapso, seccion, dia, hora_fin) VALUES (8401, 'A2-12', '7:00 a.m.', 201421, 401, 'i', '9:00 a.m.');
INSERT INTO materias_x_salon (id_materia, id_salon, hora_inicio, lapso, seccion, dia, hora_fin) VALUES (8401, 'A2-12', '7:00 a.m.', 201421, 401, 'm', '9:00 a.m.');
INSERT INTO materias_x_salon (id_materia, id_salon, hora_inicio, lapso, seccion, dia, hora_fin) VALUES (8402, 'A2-11', '6:00 p.m.', 201421, 401, 'm', '9:00 p.m.');
INSERT INTO materias_x_salon (id_materia, id_salon, hora_inicio, lapso, seccion, dia, hora_fin) VALUES (8402, 'LAB-BD', '2:00 p.m.', 201421, 401, 'i', '4:00 p.m.');
INSERT INTO materias_x_salon (id_materia, id_salon, hora_inicio, lapso, seccion, dia, hora_fin) VALUES (8406, 'LAB-BD', '9:00 a.m.', 201421, 401, 'm', '12:00 p.m.');


--
-- TOC entry 2055 (class 0 OID 17649)
-- Dependencies: 179
-- Data for Name: notificaciones; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 2056 (class 0 OID 17652)
-- Dependencies: 180
-- Data for Name: prelaciones_materias; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO prelaciones_materias (id_materia_preladora, id_materia_prelada) VALUES (1401, 2401);
INSERT INTO prelaciones_materias (id_materia_preladora, id_materia_prelada) VALUES (1402, 2401);
INSERT INTO prelaciones_materias (id_materia_preladora, id_materia_prelada) VALUES (1402, 2402);
INSERT INTO prelaciones_materias (id_materia_preladora, id_materia_prelada) VALUES (1403, 2402);
INSERT INTO prelaciones_materias (id_materia_preladora, id_materia_prelada) VALUES (1402, 2403);
INSERT INTO prelaciones_materias (id_materia_preladora, id_materia_prelada) VALUES (1403, 2403);
INSERT INTO prelaciones_materias (id_materia_preladora, id_materia_prelada) VALUES (1404, 2404);
INSERT INTO prelaciones_materias (id_materia_preladora, id_materia_prelada) VALUES (2401, 3401);
INSERT INTO prelaciones_materias (id_materia_preladora, id_materia_prelada) VALUES (2401, 3402);
INSERT INTO prelaciones_materias (id_materia_preladora, id_materia_prelada) VALUES (2402, 3403);
INSERT INTO prelaciones_materias (id_materia_preladora, id_materia_prelada) VALUES (2402, 3404);
INSERT INTO prelaciones_materias (id_materia_preladora, id_materia_prelada) VALUES (2403, 3404);
INSERT INTO prelaciones_materias (id_materia_preladora, id_materia_prelada) VALUES (2404, 3405);
INSERT INTO prelaciones_materias (id_materia_preladora, id_materia_prelada) VALUES (3401, 4401);
INSERT INTO prelaciones_materias (id_materia_preladora, id_materia_prelada) VALUES (3402, 4402);
INSERT INTO prelaciones_materias (id_materia_preladora, id_materia_prelada) VALUES (3402, 4403);
INSERT INTO prelaciones_materias (id_materia_preladora, id_materia_prelada) VALUES (3403, 5402);
INSERT INTO prelaciones_materias (id_materia_preladora, id_materia_prelada) VALUES (3404, 4404);
INSERT INTO prelaciones_materias (id_materia_preladora, id_materia_prelada) VALUES (3404, 4405);
INSERT INTO prelaciones_materias (id_materia_preladora, id_materia_prelada) VALUES (3405, 4406);
INSERT INTO prelaciones_materias (id_materia_preladora, id_materia_prelada) VALUES (4401, 5401);
INSERT INTO prelaciones_materias (id_materia_preladora, id_materia_prelada) VALUES (4402, 5402);
INSERT INTO prelaciones_materias (id_materia_preladora, id_materia_prelada) VALUES (4403, 5402);
INSERT INTO prelaciones_materias (id_materia_preladora, id_materia_prelada) VALUES (4404, 5403);
INSERT INTO prelaciones_materias (id_materia_preladora, id_materia_prelada) VALUES (4405, 5404);
INSERT INTO prelaciones_materias (id_materia_preladora, id_materia_prelada) VALUES (5401, 6401);
INSERT INTO prelaciones_materias (id_materia_preladora, id_materia_prelada) VALUES (5401, 6402);
INSERT INTO prelaciones_materias (id_materia_preladora, id_materia_prelada) VALUES (5402, 6403);
INSERT INTO prelaciones_materias (id_materia_preladora, id_materia_prelada) VALUES (5402, 6404);
INSERT INTO prelaciones_materias (id_materia_preladora, id_materia_prelada) VALUES (5403, 6404);
INSERT INTO prelaciones_materias (id_materia_preladora, id_materia_prelada) VALUES (5404, 6405);
INSERT INTO prelaciones_materias (id_materia_preladora, id_materia_prelada) VALUES (5404, 9403);
INSERT INTO prelaciones_materias (id_materia_preladora, id_materia_prelada) VALUES (6401, 7401);
INSERT INTO prelaciones_materias (id_materia_preladora, id_materia_prelada) VALUES (6402, 8401);
INSERT INTO prelaciones_materias (id_materia_preladora, id_materia_prelada) VALUES (6403, 8402);
INSERT INTO prelaciones_materias (id_materia_preladora, id_materia_prelada) VALUES (6403, 9403);
INSERT INTO prelaciones_materias (id_materia_preladora, id_materia_prelada) VALUES (6403, 7402);
INSERT INTO prelaciones_materias (id_materia_preladora, id_materia_prelada) VALUES (6404, 8402);
INSERT INTO prelaciones_materias (id_materia_preladora, id_materia_prelada) VALUES (6404, 9403);
INSERT INTO prelaciones_materias (id_materia_preladora, id_materia_prelada) VALUES (6404, 7402);
INSERT INTO prelaciones_materias (id_materia_preladora, id_materia_prelada) VALUES (6405, 7403);
INSERT INTO prelaciones_materias (id_materia_preladora, id_materia_prelada) VALUES (6405, 7404);
INSERT INTO prelaciones_materias (id_materia_preladora, id_materia_prelada) VALUES (6406, 7406);
INSERT INTO prelaciones_materias (id_materia_preladora, id_materia_prelada) VALUES (7402, 8403);
INSERT INTO prelaciones_materias (id_materia_preladora, id_materia_prelada) VALUES (7402, 9404);
INSERT INTO prelaciones_materias (id_materia_preladora, id_materia_prelada) VALUES (7403, 8404);
INSERT INTO prelaciones_materias (id_materia_preladora, id_materia_prelada) VALUES (7403, 8405);
INSERT INTO prelaciones_materias (id_materia_preladora, id_materia_prelada) VALUES (7404, 8405);
INSERT INTO prelaciones_materias (id_materia_preladora, id_materia_prelada) VALUES (7405, 8406);
INSERT INTO prelaciones_materias (id_materia_preladora, id_materia_prelada) VALUES (8401, 9402);
INSERT INTO prelaciones_materias (id_materia_preladora, id_materia_prelada) VALUES (8401, 10401);
INSERT INTO prelaciones_materias (id_materia_preladora, id_materia_prelada) VALUES (8404, 10402);
INSERT INTO prelaciones_materias (id_materia_preladora, id_materia_prelada) VALUES (8404, 10403);
INSERT INTO prelaciones_materias (id_materia_preladora, id_materia_prelada) VALUES (8405, 9405);
INSERT INTO prelaciones_materias (id_materia_preladora, id_materia_prelada) VALUES (8405, 10402);
INSERT INTO prelaciones_materias (id_materia_preladora, id_materia_prelada) VALUES (8405, 10404);
INSERT INTO prelaciones_materias (id_materia_preladora, id_materia_prelada) VALUES (8406, 10404);


--
-- TOC entry 2057 (class 0 OID 17655)
-- Dependencies: 181
-- Data for Name: prelaciones_numericas; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO prelaciones_numericas (id_materia_prelada, creditos_prelacion) VALUES (5405, 78);
INSERT INTO prelaciones_numericas (id_materia_prelada, creditos_prelacion) VALUES (6406, 100);
INSERT INTO prelaciones_numericas (id_materia_prelada, creditos_prelacion) VALUES (7405, 99);
INSERT INTO prelaciones_numericas (id_materia_prelada, creditos_prelacion) VALUES (9401, 150);


--
-- TOC entry 2058 (class 0 OID 17659)
-- Dependencies: 182
-- Data for Name: profesores; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO profesores (id_profesor, nombre_profesor, apellido_profesor) VALUES (1, 'Maria', 'Parodi');
INSERT INTO profesores (id_profesor, nombre_profesor, apellido_profesor) VALUES (2, 'Clarysse', 'Asecas');
INSERT INTO profesores (id_profesor, nombre_profesor, apellido_profesor) VALUES (3, 'Nidia ', 'Marcano');
INSERT INTO profesores (id_profesor, nombre_profesor, apellido_profesor) VALUES (4, 'Solange', 'Sanoja');
INSERT INTO profesores (id_profesor, nombre_profesor, apellido_profesor) VALUES (5, 'Faustino', 'Rodriguez');
INSERT INTO profesores (id_profesor, nombre_profesor, apellido_profesor) VALUES (6, 'Maria', 'Balza');
INSERT INTO profesores (id_profesor, nombre_profesor, apellido_profesor) VALUES (7, 'Maria', 'Cora');
INSERT INTO profesores (id_profesor, nombre_profesor, apellido_profesor) VALUES (8, 'Victor', 'Cedeño');
INSERT INTO profesores (id_profesor, nombre_profesor, apellido_profesor) VALUES (9, 'Ever', 'Salazar');
INSERT INTO profesores (id_profesor, nombre_profesor, apellido_profesor) VALUES (10, 'Silvio', 'Julia');
INSERT INTO profesores (id_profesor, nombre_profesor, apellido_profesor) VALUES (11, 'Dinora', 'Mata');
INSERT INTO profesores (id_profesor, nombre_profesor, apellido_profesor) VALUES (12, 'Jesus', 'Larez');
INSERT INTO profesores (id_profesor, nombre_profesor, apellido_profesor) VALUES (13, 'Nestor', 'Briceño');
INSERT INTO profesores (id_profesor, nombre_profesor, apellido_profesor) VALUES (14, 'Fernando', 'Trigos');
INSERT INTO profesores (id_profesor, nombre_profesor, apellido_profesor) VALUES (15, 'Gabriela', 'Telleria');
INSERT INTO profesores (id_profesor, nombre_profesor, apellido_profesor) VALUES (16, 'Jannely', 'Bello');
INSERT INTO profesores (id_profesor, nombre_profesor, apellido_profesor) VALUES (17, 'Alberto', 'Sardi');
INSERT INTO profesores (id_profesor, nombre_profesor, apellido_profesor) VALUES (18, 'Nancy', 'Mendez');
INSERT INTO profesores (id_profesor, nombre_profesor, apellido_profesor) VALUES (20, 'Rodrigo', 'Higuera');
INSERT INTO profesores (id_profesor, nombre_profesor, apellido_profesor) VALUES (21, 'Jesus', 'Rondon');
INSERT INTO profesores (id_profesor, nombre_profesor, apellido_profesor) VALUES (22, 'Christian', 'Viatour');
INSERT INTO profesores (id_profesor, nombre_profesor, apellido_profesor) VALUES (23, 'Omar', 'Castro');
INSERT INTO profesores (id_profesor, nombre_profesor, apellido_profesor) VALUES (24, 'Francisco', 'Fonseca');
INSERT INTO profesores (id_profesor, nombre_profesor, apellido_profesor) VALUES (25, 'Franklin', 'Bello');
INSERT INTO profesores (id_profesor, nombre_profesor, apellido_profesor) VALUES (26, 'Jose', 'Zacarias');
INSERT INTO profesores (id_profesor, nombre_profesor, apellido_profesor) VALUES (27, 'Romel', 'Silva');
INSERT INTO profesores (id_profesor, nombre_profesor, apellido_profesor) VALUES (28, 'Miguel', 'Bruzual');
INSERT INTO profesores (id_profesor, nombre_profesor, apellido_profesor) VALUES (29, 'Jesus', 'Gonzalez');
INSERT INTO profesores (id_profesor, nombre_profesor, apellido_profesor) VALUES (19, 'Juan', 'Gonzalez');
INSERT INTO profesores (id_profesor, nombre_profesor, apellido_profesor) VALUES (30, 'Luis', 'Cabareda');
INSERT INTO profesores (id_profesor, nombre_profesor, apellido_profesor) VALUES (31, 'Julio', 'Canelon');


--
-- TOC entry 2059 (class 0 OID 17663)
-- Dependencies: 183
-- Data for Name: salones; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO salones (id_salon, capacidad_salon, ubicacion_salon) VALUES ('A2-11', 50, 'Modulo de Aulas');
INSERT INTO salones (id_salon, capacidad_salon, ubicacion_salon) VALUES ('A2-12', 50, 'Modulo de Aulas');
INSERT INTO salones (id_salon, capacidad_salon, ubicacion_salon) VALUES ('LAB-BD', 30, 'Escuela');
INSERT INTO salones (id_salon, capacidad_salon, ubicacion_salon) VALUES ('AR-21', 40, 'Modulo de Aulas');
INSERT INTO salones (id_salon, capacidad_salon, ubicacion_salon) VALUES ('AR-24', 40, 'Modulo de Aulas');


--
-- TOC entry 1898 (class 2606 OID 17669)
-- Name: alumnos_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY alumnos
    ADD CONSTRAINT alumnos_pkey PRIMARY KEY (id_alumno);


--
-- TOC entry 1900 (class 2606 OID 17671)
-- Name: alumnos_x_holds_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY alumnos_x_holds
    ADD CONSTRAINT alumnos_x_holds_pkey PRIMARY KEY (id_alumno, id_hold);


--
-- TOC entry 1902 (class 2606 OID 17673)
-- Name: cuentas_x_profesores_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY cuentas_x_profesores
    ADD CONSTRAINT cuentas_x_profesores_pkey PRIMARY KEY (id_profesor);


--
-- TOC entry 1904 (class 2606 OID 17675)
-- Name: holds_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY holds
    ADD CONSTRAINT holds_pkey PRIMARY KEY (id_hold);


--
-- TOC entry 1906 (class 2606 OID 17677)
-- Name: lapsos_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY lapsos
    ADD CONSTRAINT lapsos_pkey PRIMARY KEY (lapso);


--
-- TOC entry 1908 (class 2606 OID 17679)
-- Name: materias_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY materias
    ADD CONSTRAINT materias_pkey PRIMARY KEY (id_materia);


--
-- TOC entry 1910 (class 2606 OID 17681)
-- Name: materias_x_alumnos_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY materias_x_alumnos
    ADD CONSTRAINT materias_x_alumnos_pkey PRIMARY KEY (id_materia, id_alumno, lapso);


--
-- TOC entry 1912 (class 2606 OID 17683)
-- Name: materias_x_profesores_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY materias_x_profesores
    ADD CONSTRAINT materias_x_profesores_pkey PRIMARY KEY (id_materia, id_profesor, lapso, seccion);


--
-- TOC entry 1914 (class 2606 OID 17685)
-- Name: materias_x_salon_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY materias_x_salon
    ADD CONSTRAINT materias_x_salon_pkey PRIMARY KEY (id_materia, id_salon, dia, hora_inicio, lapso);


--
-- TOC entry 1916 (class 2606 OID 17687)
-- Name: notificaciones_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY notificaciones
    ADD CONSTRAINT notificaciones_pkey PRIMARY KEY (id_alumno, mensaje);


--
-- TOC entry 1918 (class 2606 OID 17689)
-- Name: prelaciones_materias_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY prelaciones_materias
    ADD CONSTRAINT prelaciones_materias_pkey PRIMARY KEY (id_materia_preladora, id_materia_prelada);


--
-- TOC entry 1920 (class 2606 OID 17691)
-- Name: prelaciones_numericas_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY prelaciones_numericas
    ADD CONSTRAINT prelaciones_numericas_pkey PRIMARY KEY (id_materia_prelada);


--
-- TOC entry 1922 (class 2606 OID 17693)
-- Name: profesores_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY profesores
    ADD CONSTRAINT profesores_pkey PRIMARY KEY (id_profesor);


--
-- TOC entry 1924 (class 2606 OID 17695)
-- Name: salones_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY salones
    ADD CONSTRAINT salones_pkey PRIMARY KEY (id_salon);


--
-- TOC entry 1925 (class 2606 OID 17696)
-- Name: cuentas_x_profesores_id_profesor_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY cuentas_x_profesores
    ADD CONSTRAINT cuentas_x_profesores_id_profesor_fkey FOREIGN KEY (id_profesor) REFERENCES profesores(id_profesor) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 1926 (class 2606 OID 17701)
-- Name: lapso_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY materias_x_alumnos
    ADD CONSTRAINT lapso_fkey FOREIGN KEY (lapso) REFERENCES lapsos(lapso) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 1929 (class 2606 OID 17706)
-- Name: lapso_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY materias_x_profesores
    ADD CONSTRAINT lapso_fkey FOREIGN KEY (lapso) REFERENCES lapsos(lapso) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 1932 (class 2606 OID 17711)
-- Name: lapso_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY materias_x_salon
    ADD CONSTRAINT lapso_fkey FOREIGN KEY (lapso) REFERENCES lapsos(lapso) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 1927 (class 2606 OID 17716)
-- Name: materias_x_alumnos_id_alumno_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY materias_x_alumnos
    ADD CONSTRAINT materias_x_alumnos_id_alumno_fkey FOREIGN KEY (id_alumno) REFERENCES alumnos(id_alumno) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 1928 (class 2606 OID 17721)
-- Name: materias_x_alumnos_id_materia_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY materias_x_alumnos
    ADD CONSTRAINT materias_x_alumnos_id_materia_fkey FOREIGN KEY (id_materia) REFERENCES materias(id_materia) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 1930 (class 2606 OID 17726)
-- Name: materias_x_profesores_id_materia_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY materias_x_profesores
    ADD CONSTRAINT materias_x_profesores_id_materia_fkey FOREIGN KEY (id_materia) REFERENCES materias(id_materia) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 1931 (class 2606 OID 17731)
-- Name: materias_x_profesores_id_profesor_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY materias_x_profesores
    ADD CONSTRAINT materias_x_profesores_id_profesor_fkey FOREIGN KEY (id_profesor) REFERENCES profesores(id_profesor) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 1933 (class 2606 OID 17736)
-- Name: materias_x_salon_id_materia_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY materias_x_salon
    ADD CONSTRAINT materias_x_salon_id_materia_fkey FOREIGN KEY (id_materia) REFERENCES materias(id_materia) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 1934 (class 2606 OID 17741)
-- Name: materias_x_salon_id_salon_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY materias_x_salon
    ADD CONSTRAINT materias_x_salon_id_salon_fkey FOREIGN KEY (id_salon) REFERENCES salones(id_salon) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 1935 (class 2606 OID 17746)
-- Name: notificaciones_id_alumno_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY notificaciones
    ADD CONSTRAINT notificaciones_id_alumno_fkey FOREIGN KEY (id_alumno) REFERENCES alumnos(id_alumno) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 1936 (class 2606 OID 17751)
-- Name: prelaciones_materias_id_materia_prelada_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY prelaciones_materias
    ADD CONSTRAINT prelaciones_materias_id_materia_prelada_fkey FOREIGN KEY (id_materia_prelada) REFERENCES materias(id_materia) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 1937 (class 2606 OID 17756)
-- Name: prelaciones_materias_id_materia_preladora_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY prelaciones_materias
    ADD CONSTRAINT prelaciones_materias_id_materia_preladora_fkey FOREIGN KEY (id_materia_preladora) REFERENCES materias(id_materia) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 1938 (class 2606 OID 17761)
-- Name: prelaciones_numericas_id_materia_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY prelaciones_numericas
    ADD CONSTRAINT prelaciones_numericas_id_materia_fkey FOREIGN KEY (id_materia_prelada) REFERENCES materias(id_materia) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 2066 (class 0 OID 0)
-- Dependencies: 6
-- Name: public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE ALL ON SCHEMA public FROM PUBLIC;
REVOKE ALL ON SCHEMA public FROM postgres;
GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO PUBLIC;


-- Completed on 2014-01-18 21:25:30 VET

--
-- PostgreSQL database dump complete
--
