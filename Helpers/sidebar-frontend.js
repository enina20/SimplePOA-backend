const getSideBar = (role = "usuario", id = 1) => {
  const administrador = [
    {
      id: 1,
      name: "Administrativos centrales",
      icono: "https://img.icons8.com/color/48/000000/meeting-room.png",
      item: "4",
      subprograma: [
        {
          name: "Administración Concejo Municipal",
          ruta: "unidad/administración-concejo-municipal",
        },
        {
          name: "Administración Despacho Alcalde Municipal",
          ruta: "unidad/administración-despacho-alcalde-municipal",
        },
        { name: "Dirección del Gabinete", ruta: "unidad/dirección-gabinete" },
        { name: "Auditoría Interna", ruta: "unidad/auditoría-interna" },
      ],
    },
    {
      id: 2,
      name: "Direcciones",
      icono: "https://img.icons8.com/color/48/000000/sales-channels.png",

      item: "4",
      subprograma: [
        {
          name: "Dirección General de Asuntos Jurídicos",
          ruta: "unidad/dirección-general-asuntos-jurídicos",
        },
        {
          name: "Dirección de Transparencia y Lucha contra la Corrupción",
          ruta: "unidad/dirección-transparencia-lucha-contra-corrupción",
        },
        {
          name: "Dirección de Coordinación de Políticas de Igualdad",
          ruta: "unidad/dirección-coordinación-políticas-igualdad",
        },
        {
          name: "Dirección de Comunicación Social",
          ruta: "unidad/dirección-comunicación-social",
        },
      ],
    },
    {
      id: 3,
      name: "Secretarias",
      icono: "https://img.icons8.com/color/48/000000/teamwork--v2.png",

      item: "4",
      subprograma: [
        {
          name: "Secretaria de Educación y Cultura Ciudadana",
          ruta: "unidad/dirección-general-asuntos-jurídicos",
        },
        {
          name: "Secretaria de Desarrollo Social",
          ruta: "unidad/dirección-general-asuntos-jurídicos",
        },
        {
          name: "Secretaria de Salud y Deportes",
          ruta: "unidad/dirección-general-asuntos-jurídicos",
        },
        {
          name: "Secretaria de Infraestructura Pública",
          ruta: "unidad/dirección-general-asuntos-jurídicos",
        },
      ],
    },
    {
      id: 5,
      name: "Personal y usuarios",
      icono:
        "https://img.icons8.com/color/50/000000/registration-skin-type-7.png",

      item: "1",
      subprograma: [{ name: "Listado", ruta: "listado" }],
    },
    {
      id: 4,
      name: "POA General",
      icono: "https://img.icons8.com/color/48/000000/rules.png",

      item: "1",
      subprograma: [{ name: "Mostrar el POA general", ruta: "poa-general" }],
    },
  ];

  const administradorUnidad = (id) => {
    const unidad = administrador.filter((prog) => prog.id === id);
    unidad.push(administrador[4], administrador[3]);

    return unidad;
  };

  const usuarioRole = (id) => {
    const user = administrador.filter((prog) => prog.id === id);
    user.push(administrador[4], administrador[3]);

    return user;
  };

  switch (role) {
    case "Administrador":
      return administrador;
      break;
    case "Jefe de unidad":
      return administradorUnidad(id);
      break;
    case "Usuario":
      return usuarioRole(id);
      break;

    default:
      return;
      break;
  }
};

module.exports = {
  getSideBar,
};
