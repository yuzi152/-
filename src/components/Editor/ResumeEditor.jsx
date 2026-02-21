import React, { useState } from 'react';
import { Container, Grid, Paper, Tabs, Tab, Box, Button, AppBar } from '@mui/material';
import { useResume } from '../../contexts/ResumeContext';
import ResumePreview from '../Preview/ResumePreview';
import PersonalInfoEditor from './PersonalInfoEditor';
import ExperienceEditor from './ExperienceEditor';
import EducationEditor from './EducationEditor';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

const ResumeEditor = () => {
  const { state } = useResume();
  const [activeTab, setActiveTab] = useState(0);

  const handleExportPDF = async () => {
    const input = document.getElementById('resume-preview');
    if (!input) {
      console.error('未找到简历预览元素');
      alert('导出失败：未找到简历预览内容！');
      return;
    }

    // 1. 配置PDF左右留白（单位：mm，可自行调整）
    const pdfMarginX = 15; // 左右各留15mm（核心配置，可改20/10等）
    const a4Width = 210; // A4纸张总宽度（mm）
    const contentWidth = a4Width - 2 * pdfMarginX; // 内容实际宽度（减去左右留白）

    // 临时样式备份
    const originalStyle = {
      boxShadow: input.style.boxShadow,
      backgroundColor: input.style.backgroundColor,
      opacity: input.style.opacity,
      filter: input.style.filter
    };

    // 临时纯净容器（解决阴影问题）
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
      // 清理原元素样式
      input.style.boxShadow = 'none';
      input.style.backgroundColor = '#ffffff';
      input.style.opacity = '1';
      input.style.filter = 'none';

      // 生成canvas
      const canvas = await html2canvas(tempContainer, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
        allowTaint: false,
        removeContainer: true
      });

      // 生成JPEG图片
      const imgData = canvas.toDataURL('image/jpeg', 1.0);
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      // 2. 计算图片高度（按内容宽度等比缩放）
      const imgWidth = contentWidth; // 图片宽度 = 内容宽度（已减留白）
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let position = 0; // 纵向起始位置（可加pdfMarginY实现上下留白）

      // 3. 绘制图片：x轴从pdfMarginX开始（左侧留白），宽度为contentWidth
      pdf.addImage(imgData, 'JPEG', pdfMarginX, position, imgWidth, imgHeight);

      // 分页逻辑（适配长简历）
      if (imgHeight > 297) { // A4高度297mm
        pdf.addPage();
        position = -297 + imgHeight;
        pdf.addImage(imgData, 'JPEG', pdfMarginX, position, imgWidth, imgHeight);
      }

      // 下载PDF
      const userName = state?.personalInfo?.name || 'user';
      pdf.save(`resume_${userName}.pdf`);
      alert('PDF导出成功（已添加左右留白）！');

    } catch (error) {
      console.error('导出PDF失败:', error);
      alert(`导出失败：${error.message}`);
    } finally {
      // 恢复样式+删除临时容器
      Object.keys(originalStyle).forEach(key => {
        input.style[key] = originalStyle[key];
      });
      document.body.removeChild(tempContainer);
    }
  };

  const tabLabels = ['个人信息', '工作经验', '教育背景', '项目经历', '技能', '语言'];

  return (
    <Container maxWidth="xl" sx={{ py: 3 }}>
      <AppBar position="static" color="default" sx={{ mb: 2 }}>
        <Tabs
          value={activeTab}
          onChange={(e, newValue) => setActiveTab(newValue)}
          variant="scrollable"
          scrollButtons="auto"
        >
          {tabLabels.map((label, index) => (
            <Tab key={index} label={label} />
          ))}
        </Tabs>
      </AppBar>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 2, height: 'calc(100vh - 200px)', overflowY: 'auto' }}>
            {activeTab === 0 && <PersonalInfoEditor />}
            {activeTab === 1 && <ExperienceEditor />}
            {activeTab === 2 && <EducationEditor />}
            {activeTab === 3 && <div>项目经历编辑器 (待实现)</div>}
            {activeTab === 4 && <div>技能编辑器 (待实现)</div>}
            {activeTab === 5 && <div>语言编辑器 (待实现)</div>}
          </Paper>

          <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
            <Button variant="contained" color="primary" onClick={handleExportPDF}>
              导出PDF
            </Button>
            <Button variant="outlined" color="secondary">
              保存草稿
            </Button>
          </Box>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 2, height: 'calc(100vh - 200px)', overflowY: 'auto' }}>
            <ResumePreview />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ResumeEditor;