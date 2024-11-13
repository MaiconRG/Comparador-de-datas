// Função para comparar datas (mês e ano)
function compararDatas(data1, data2) {
    const data1Obj = new Date(data1);
    const data2Obj = new Date(data2);
  
    // Compara o mês e o ano
    return (data1Obj.getFullYear() === data2Obj.getFullYear() && data1Obj.getMonth() === data2Obj.getMonth()) ? "Certo" : "Errado";
  }
  
  // Função para processar o CSV
  function processarCsv() {
    const input = document.getElementById("uploadCsv").files[0];
    const statusMessage = document.getElementById("statusMessage");
    
    if (!input) {
      statusMessage.textContent = "Por favor, selecione um arquivo CSV.";
      return;
    }
    
    const reader = new FileReader();
    
    // Ao carregar o arquivo
    reader.onload = function(event) {
      try {
        const linhas = event.target.result.split("\n");
        const resultadoCsv = ["Pago Até,Data do Vencimento,ID,Resultado"];
        
        // Processa cada linha (pulando o cabeçalho)
        for (let i = 1; i < linhas.length; i++) {
          const linha = linhas[i].split(",");
          
          if (linha.length < 3) continue; // Ignora linhas incompletas
          
          const dataPagoAte = linha[0];
          const dataVencimento = linha[1];
          const id = linha[2];
          const resultado = compararDatas(dataPagoAte, dataVencimento);
          
          // Adiciona o resultado ao CSV
          resultadoCsv.push(`${dataPagoAte},${dataVencimento},${id},${resultado}`);
        }
        
        // Cria um blob com o resultado para download
        const blob = new Blob([resultadoCsv.join("\n")], { type: "text/csv" });
        const url = URL.createObjectURL(blob);
        
        const downloadButton = document.getElementById("downloadButton");
        downloadButton.href = url;
        downloadButton.download = "resultado_comparacao.csv";
        downloadButton.style.display = "inline";
        downloadButton.textContent = "Baixar Resultado";
        
        statusMessage.textContent = "Processamento concluído com sucesso!";
      } catch (error) {
        statusMessage.textContent = "Erro ao processar o arquivo. Verifique se o formato está correto.";
        console.error("Erro:", error);
      }
    };
    
    // Lê o arquivo como texto
    reader.readAsText(input);
  }
  
  // Adiciona evento ao botão "Processar CSV" após o carregamento do DOM
  document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("processarButton").addEventListener("click", processarCsv);
  });
  