import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Card, CardContent, IconButton, Grid } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useResume } from '../../contexts/ResumeContext';

const ProjectEditor = () => {
  const { state, dispatch } = useResume();
  // 初始化兜底，防止 sections 或 projects 不存在
  const projectsList = state?.sections?.projects || [];
  const [isAdding, setIsAdding] = useState(false);
  const [currentProject, setCurrentProject] = useState({
    name: '',
    role: '',
    startDate: '',
    endDate: '',
    description: ''
  });

  const handleAdd = () => {
    if (currentProject.name && currentProject.role) {
      dispatch({ type: 'ADD_PROJECT', payload: { id: Date.now().toString(), ...currentProject } });
      setCurrentProject({
        name: '',
        role: '',
        startDate: '',
        endDate: '',
        description: ''
      });
      setIsAdding(false);
    }
  };

  const handleRemove = (index) => {
    dispatch({ type: 'REMOVE_PROJECT', index });
  };

  const handleUpdate = (index, updatedProject) => {
    dispatch({ type: 'UPDATE_PROJECT', index, payload: updatedProject });
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        项目经历
      </Typography>

      {/* 使用兜底后的数组进行渲染，避免 undefined 错误 */}
      {projectsList.map((project, index) => (
        <Card key={index} sx={{ mb: 2 }}>
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="项目名称"
                  value={project.name || ''}
                  onChange={(e) => {
                    const updated = { ...project, name: e.target.value };
                    handleUpdate(index, updated);
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="角色"
                  value={project.role || ''}
                  onChange={(e) => {
                    const updated = { ...project, role: e.target.value };
                    handleUpdate(index, updated);
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="开始时间"
                  type="month"
                  value={project.startDate || ''}
                  onChange={(e) => {
                    const updated = { ...project, startDate: e.target.value };
                    handleUpdate(index, updated);
                  }}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="结束时间"
                  type="month"
                  value={project.endDate || ''}
                  onChange={(e) => {
                    const updated = { ...project, endDate: e.target.value };
                    handleUpdate(index, updated);
                  }}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="描述"
                  multiline
                  rows={3}
                  value={project.description || ''}
                  onChange={(e) => {
                    const updated = { ...project, description: e.target.value };
                    handleUpdate(index, updated);
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <IconButton
                  color="error"
                  onClick={() => handleRemove(index)}
                  size="small"
                >
                  <DeleteIcon />
                </IconButton>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      ))}

      {isAdding ? (
        <Card sx={{ mb: 2, p: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="项目名称"
                value={currentProject.name}
                onChange={(e) => setCurrentProject({...currentProject, name: e.target.value})}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="角色"
                value={currentProject.role}
                onChange={(e) => setCurrentProject({...currentProject, role: e.target.value})}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="开始时间"
                type="month"
                value={currentProject.startDate}
                onChange={(e) => setCurrentProject({...currentProject, startDate: e.target.value})}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="结束时间"
                type="month"
                value={currentProject.endDate}
                onChange={(e) => setCurrentProject({...currentProject, endDate: e.target.value})}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="描述"
                multiline
                rows={3}
                value={currentProject.description}
                onChange={(e) => setCurrentProject({...currentProject, description: e.target.value})}
              />
            </Grid>
            <Grid item xs={12} sx={{ textAlign: 'right' }}>
              <Button onClick={() => setIsAdding(false)} sx={{ mr: 1 }}>
                取消
              </Button>
              <Button variant="contained" onClick={handleAdd}>
                添加
              </Button>
            </Grid>
          </Grid>
        </Card>
      ) : (
        <Button variant="outlined" onClick={() => setIsAdding(true)}>
          + 添加项目经历
        </Button>
      )}
    </Box>
  );
};

export default ProjectEditor;