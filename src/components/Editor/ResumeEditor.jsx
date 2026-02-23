import React, { useState } from 'react';
import { Container, Grid, Paper, Tabs, Tab, Box, Button, AppBar } from '@mui/material';
import { useResume } from '../../contexts/ResumeContext';
import ResumePreview from '../Preview/ResumePreview';
import PersonalInfoEditor from './PersonalInfoEditor';
import ExperienceEditor from './ExperienceEditor';
import EducationEditor from './EducationEditor';
import ProjectEditor from './ProjectEditor';
import { exportToPDF } from '../../utils/pdfExporter';
import { exportToJson, importFromJson } from '../../utils/jsonExporter';

const ResumeEditor = () => {
  const { state, dispatch } = useResume();
  const [activeTab, setActiveTab] = useState(0);

  const handleExportPDF = async () => {
    try {
      await exportToPDF(state.personalInfo.name || 'user');
    } catch (error) {
      console.error('导出PDF失败:', error);
      alert(`导出失败：${error.message}`);
    }
  };

  const handleExportJson = () => {
    try {
      exportToJson(state, 'resume.json');
    } catch (error) {
      console.error('导出JSON失败:', error);
      alert(`导出失败：${error.message}`);
    }
  };

  const handleImportJson = (e) => {
    const file = e.target.files[0];
    if (file) {
      importFromJson(file)
        .then(data => {
          // 验证数据结构
          if (data && typeof data === 'object') {
            dispatch({ type: 'LOAD_RESUME', payload: data });
            alert('导入成功！');
          } else {
            throw new Error('JSON数据格式无效');
          }
        })
        .catch(error => {
          console.error('导入JSON失败:', error);
          alert(`导入失败：${error.message}`);
        });
    }
  };

  const tabLabels = ['个人信息', '工作经验', '教育背景', '项目经历'];

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
            {activeTab === 3 && <ProjectEditor />}
          </Paper>

          <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
            <Button variant="contained" color="primary" onClick={handleExportPDF}>
              导出PDF
            </Button>
            <Button variant="outlined" color="secondary" onClick={handleExportJson}>
              导出JSON
            </Button>
            <Button
              variant="outlined"
              color="info"
              component="label"
            >
              导入JSON
              <input
                type="file"
                accept=".json"
                hidden
                onChange={handleImportJson}
              />
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