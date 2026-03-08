const { createApp } = window.Vue;

const todayString = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

createApp({
  data() {
    return {
      services: [
        { name: "Consultatie laser", detail: "Evaluare completa si plan personalizat.", duration: "30 min" },
        { name: "Igienizare profesionala", detail: "Curatare delicata fara disconfort.", duration: "45 min" },
        { name: "Tratament carii", detail: "Precizie fara vibratii.", duration: "40 min" },
        { name: "Chirurgie minim invaziva", detail: "Vindecare accelerata si controlata.", duration: "50 min" },
        { name: "Estetica dentara", detail: "Albire si contur premium.", duration: "60 min" }
      ],
      benefits: [
        { title: "Fara durere", detail: "Interventii minim invazive, fara vibratii agresive." },
        { title: "Recuperare rapida", detail: "Vindecare accelerata si mai putin disconfort post-tratament." },
        { title: "Precizie laser", detail: "Tinta sigura, impact minim asupra tesutului sanatos." }
      ],
      booking: {
        service: "Consultatie laser",
        date: todayString(),
        time: "09:00",
        name: "",
        phone: ""
      },
      bookingMessage: ""
    };
  },
  computed: {
    timeSlots() {
      const slots = [];
      for (let minutes = 9 * 60; minutes <= 16 * 60 + 30; minutes += 30) {
        const hour = String(Math.floor(minutes / 60)).padStart(2, "0");
        const minute = String(minutes % 60).padStart(2, "0");
        slots.push(`${hour}:${minute}`);
      }
      return slots;
    },
    isWeekend() {
      const date = new Date(this.booking.date);
      const day = date.getDay();
      return day === 0 || day === 6;
    }
  },
  methods: {
    handleSubmit(event) {
      this.bookingMessage = "";
      if (!this.booking.name || !this.booking.phone) {
        this.bookingMessage = "Completeaza numele si telefonul pentru a trimite cererea.";
        return;
      }
      if (this.isWeekend) {
        this.bookingMessage = "Te rugam sa selectezi o zi de Luni pana Vineri.";
        return;
      }
      this.bookingMessage = "Se trimite cererea...";
      event.target.submit();
    }
  }
}).mount("#app");
