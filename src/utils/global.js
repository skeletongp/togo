import NumberSuffix from "number-suffix";
import { Loading } from "quasar";
import moment from "moment/moment";

const shortNumber = (number, precision = 0) => {
  if (number > 999) {
    number = NumberSuffix.format(number, {
      precision: precision,
      style: "abbreviation",
    });
  }
  return number;
};
const ellipsis = (text, length = 20) => {
  if (text.length > length) {
    return text.substring(0, length) + "...";
  }
  return text;
};

const since = (date) => {
  const seconds = Math.floor((new Date() - new Date(date)) / 1000);
  let interval = Math.floor(seconds / 31536000);

  if (interval < 0) {
    let text = " Hace un momento";
    return text;
  }

  if (interval > 0) {
    let text = interval === 1 ? " Hace un año" : " Hace " + interval + " años";
    return text;
  }
  interval = Math.floor(seconds / 2592000);
  if (interval > 0) {
    let text = interval === 1 ? " Hace un mes" : " Hace " + interval + " meses";
    return text;
  }
  interval = Math.floor(seconds / 86400);
  if (interval > 0) {
    let text = interval === 1 ? " Hace un día" : " Hace " + interval + " días";
    return text;
  }
  interval = Math.floor(seconds / 3600);
  if (interval > 0) {
    let text =
      interval === 1 ? " Hace una hora" : " Hace " + interval + " horas";
    return text;
  }
  interval = Math.floor(seconds / 60);
  if (interval > 0) {
    let text =
      interval === 1 ? " Hace un minuto" : " Hace " + interval + " minutos";
    return text;
  }
  let text =
    Math.floor(seconds) === 1
      ? " Hace un segundo"
      : " Hace " + Math.floor(seconds) + " segundos";
  return text;
};

function currentFormatDate() {
  let date = new Date();
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  let hour = date.getHours();
  let minute = date.getMinutes();
  let second = date.getSeconds();
  let dateNow =
    year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second;
  return dateNow;
}
const comprimirImagen = (imagenComoArchivo, porcentajeCalidad) => {
  return new Promise((resolve, reject) => {
    const $canvas = document.createElement("canvas");
    const imagen = new Image();
    imagen.onload = () => {
      $canvas.width = imagen.width;
      $canvas.height = imagen.height;
      $canvas.getContext("2d").drawImage(imagen, 0, 0);
      $canvas.toBlob(
        (blob) => {
          if (blob === null) {
            return reject(blob);
          } else {
            resolve(blob);
          }
        },
        "image/jpeg",
        porcentajeCalidad / 100
      );
    };
    imagen.src = URL.createObjectURL(imagenComoArchivo);
  });
};
async function resizeImages(files) {
  let resizedImages = [];
  for (let i = 0; i < files.length; i++) {
    if (files[i].size > 1024 * 1024 * 1) {
      const resizedImage = await comprimirImagen(files[i], 50);
      resizedImages.push(resizedImage);
      console.log(resizedImage.size);
    } else {
      resizedImages.push(files[i]);
    }
  }
  return resizedImages;
}

function formatDate(date, format = "YYYY-MM-DD") {
  if (!date || date === null || date === undefined) {
    return "";
  }

  moment.locale("es-do");
  if (date.length >= 10) {
    return moment(date).format(format);
  } else {
    //add am or pm to hour

    let time = moment(date, "HH:mm:ss").format("hh:mm a");
    return time;
  }
}

function formatMoney(number) {
  number = parseFloat(number);
  if (isNaN(number)) {
    return "$" + "0";
  }
  return "$" + number.toLocaleString("en-US");
}

function formatNumber(number, precision = 0) {
  number = parseFloat(number);
  if (isNaN(number)) {
    return 0;
  }
  return number.toLocaleString("en-US");
}

function strPad(number, length = 4, pad = "0", type = "left") {
  let str = number.toString();
  if (type === "left") {
    return str.padStart(length, pad).toString();
  } else {
    return str.padEnd(length, pad);
  }
}

function resetForm(form) {
  Object.keys(form).forEach((key) => {
    form[key] = null;
  });
  return form;
}

const pdfHeader = function (
  doc,
  user,
  title,
  headers,
  body,
  autoTable,
  parseCell
) {
  var logo = new Image();
  logo.src = user.store.logo
    ? user.store.logo
    : "https://res.cloudinary.com/atriontechsd/image/upload/v1671150078/nodata_odjrse.jpg";
  const width = doc.internal.pageSize.width;
  const height = doc.internal.pageSize.height;
  const store = user.store;
  const date = new Date().toLocaleDateString();
  const time = new Date().toLocaleTimeString();
  //set header text and style
  doc.addImage(logo, "png", width / 2.5, 8, 40, 0);
  doc.setFont("Courier", "Bold");
  doc.setFontSize(17);
  doc.setTextColor(40);
  doc.text(store.name.toUpperCase(), width / 2, 35, null, null, "center");
  doc.setFontSize(10);
  var phones = store.phone1 + " / " + store.phone2;
  var address = doc.splitTextToSize(store.address.toUpperCase(), 125);
  doc.text(phones, width / 2, 39, null, null, "center");
  doc.text(address, width / 2, 43, null, null, "center");
  var header = function (data) {
    var titleHeight = data.pageCount == 1 ? 59 : 20;
    doc.setFontSize(10);
    doc.setFontSize(18);
    doc.text(title, width / 2, titleHeight, null, null, "center");
    doc.setFontSize(12);
    doc.text(date, 10, 6, null, null, "left");
    doc.text(time, 10, 11, null, null, "left");
    doc.text(user.name.toUpperCase(), 10, height - 6, null, null, "left");
  };
  autoTable(doc, {
    head: headers,
    body: body,
    startY: 63,
    margin: { top: 24 },
    didParseCell: function (data) {
      parseCell(data);
    },
    didDrawPage: function (data) {
      header(data),
        doc.setFontSize(10),
        doc.text(
          "Página " + data.pageNumber,
          width - 10,
          height - 6,
          null,
          null,
          "right"
        );
    },
  });
  return header;
};

export {
  shortNumber,
  ellipsis,
  since,
  currentFormatDate,
  resizeImages,
  formatDate,
  formatMoney,
  formatNumber,
  strPad,
  resetForm,
  pdfHeader,
};
