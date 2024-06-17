document.addEventListener('DOMContentLoaded', (event) => {
    const dataFinalizadoField = document.getElementById('dataFinalizado');
    if (!dataFinalizadoField.value) {
      const today = new Date().toISOString().split('T')[0];
      dataFinalizadoField.value = today;
    }
  });