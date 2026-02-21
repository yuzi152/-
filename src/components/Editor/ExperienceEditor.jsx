import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Card, CardContent, IconButton, Grid } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useResume } from '../../contexts/ResumeContext';

const ExperienceEditor = () => {
  const { state, dispatch } = useResume();
  const [isAdding, setIsAdding] = useState(false);
  const [currentExp, setCurrentExp] = useState({
    company: '',
    position: '',
    startDate: '',
    endDate: '',
    description: ''
  });

  const handleAdd = () => {
    if (currentExp.company && currentExp.position) {
      dispatch({ type: 'ADD_EXPERIENCE', payload: { id: Date.now().toString(), ...currentExp } });
      setCurrentExp({
        company: '',
        position: '',
        startDate: '',
        endDate: '',
        description: ''
      });
      setIsAdding(false);
    }
  };

  const handleRemove = (index) => {
    dispatch({ type: 'REMOVE_EXPERIENCE', index });
  };

  const handleUpdate = (index, updatedExp) => {
    dispatch({ type: 'UPDATE_EXPERIENCE', index, payload: updatedExp });
  };

  // 关键修复：使用可选链 + 空数组兜底，避免 undefined.map 错误
  const experiences = state.sections?.experience || [];

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        工作经验
      </Typography>

      {experiences.map((exp, index) => (
        <Card key={index} sx={{ mb: 2 }}>
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="公司"
                  value={exp.company}
                  onChange={(e) => {
                    const updated = { ...exp, company: e.target.value };
                    handleUpdate(index, updated);
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="职位"
                  value={exp.position}
                  onChange={(e) => {
                    const updated = { ...exp, position: e.target.value };
                    handleUpdate(index, updated);
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="开始日期"
                  type="date"
                  value={exp.startDate}
                  InputLabelProps={{ shrink: true }}
                  onChange={(e) => {
                    const updated = { ...exp, startDate: e.target.value };
                    handleUpdate(index, updated);
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="结束日期"
                  type="date"
                  value={exp.endDate}
                  InputLabelProps={{ shrink: true }}
                  onChange={(e) => {
                    const updated = { ...exp, endDate: e.target.value };
                    handleUpdate(index, updated);
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="工作描述"
                  multiline
                  rows={3}
                  value={exp.description}
                  onChange={(e) => {
                    const updated = { ...exp, description: e.target.value };
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
                label="公司"
                value={currentExp.company}
                onChange={(e) => setCurrentExp({...currentExp, company: e.target.value})}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="职位"
                value={currentExp.position}
                onChange={(e) => setCurrentExp({...currentExp, position: e.target.value})}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="开始日期"
                type="date"
                value={currentExp.startDate}
                InputLabelProps={{ shrink: true }}
                onChange={(e) => setCurrentExp({...currentExp, startDate: e.target.value})}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="结束日期"
                type="date"
                value={currentExp.endDate}
                InputLabelProps={{ shrink: true }}
                onChange={(e) => setCurrentExp({...currentExp, endDate: e.target.value})}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="工作描述"
                multiline
                rows={3}
                value={currentExp.description}
                onChange={(e) => setCurrentExp({...currentExp, description: e.target.value})}
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
          + 添加工作经验
        </Button>
      )}
    </Box>
  );
};

export default ExperienceEditor;