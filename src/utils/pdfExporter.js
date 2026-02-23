import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

export const exportToPDF = async (userName) => {
  const input = document.getElementById('resume-preview');
  if (!input) throw new Error('未找到简历预览元素');

  const pdfMarginX = 15;
  const a4Width = 210;
  const contentWidth = a4Width - 2 * pdfMarginX;

  const tempContainer = document.createElement('div');
  tempContainer.style.cssText = `
    width: ${input.offsetWidth}px;
    height: ${input.offsetHeight}px;
    background: #ffffff;
    box-shadow: none;
    opacity: 1;
    position: absolute;
    top: -9999px;
    left: -9999px;
  `;
  document.body.appendChild(tempContainer);
  tempContainer.innerHTML = input.innerHTML;

  try {
    input.style.boxShadow = 'none';
    input.style.backgroundColor = '#ffffff';
    input.style.opacity = '1';
    input.style.filter = 'none';

    const canvas = await html2canvas(tempContainer, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff',
      allowTaint: false,
      removeContainer: true
    });

    const imgData = canvas.toDataURL('image/jpeg', 1.0);
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    const imgWidth = contentWidth;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let position = 0;

    pdf.addImage(imgData, 'JPEG', pdfMarginX, position, imgWidth, imgHeight);

    if (imgHeight > 297) {
      pdf.addPage();
      position = -297 + imgHeight;
      pdf.addImage(imgData, 'JPEG', pdfMarginX, position, imgWidth, imgHeight);
    }

    pdf.save(`resume_${userName}.pdf`);
    alert('PDF导出成功（已添加左右留白）！');
  } finally {
    document.body.removeChild(tempContainer);
  }
};