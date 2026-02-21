import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Card, CardContent, IconButton, Grid } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useResume } from '../../contexts/ResumeContext';

const EducationEditor = () => {
  const { state, dispatch } = useResume();
  // 初始化兜底，防止 sections 或 education 不存在
  const educationList = state?.sections?.education || [];
  const [isAdding, setIsAdding] = useState(false);
  const [currentEdu, setCurrentEdu] = useState({
    institution: '',
    degree: '',
    major: '',
    startDate: '',
    endDate: '',
    description: ''
  });

  const handleAdd = () => {
    if (currentEdu.institution && currentEdu.degree) {
      dispatch({ type: 'ADD_EDUCATION', payload: { id: Date.now().toString(), ...currentEdu } });
      setCurrentEdu({
        institution: '',
        degree: '',
        major: '',
        startDate: '',
        endDate: '',
        description: ''
      });
      setIsAdding(false);
    }
  };

  const handleRemove = (index) => {
    dispatch({ type: 'REMOVE_EDUCATION', index });
  };

  const handleUpdate = (index, updatedEdu) => {
    dispatch({ type: 'UPDATE_EDUCATION', index, payload: updatedEdu });
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        教育背景
      </Typography>

      {/* 使用兜底后的数组进行渲染，避免 undefined 错误 */}
      {educationList.map((edu, index) => (
        <Card key={index} sx={{ mb: 2 }}>
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="学校"
                  value={edu.institution || ''} // 单个字段兜底
                  onChange={(e) => {
                    const updated = { ...edu, institution: e.target.value };
                    handleUpdate(index, updated);
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="学历"
                  value={edu.degree || ''} // 单个字段兜底
                  onChange={(e) => {
                    const updated = { ...edu, degree: e.target.value };
                    handleUpdate(index, updated);
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="专业"
                  value={edu.major || ''} // 单个字段兜底
                  onChange={(e) => {
                    const updated = { ...edu, major: e.target.value };
                    handleUpdate(index, updated);
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="开始日期"
                  type="date"
                  value={edu.startDate || ''} // 单个字段兜底
                  InputLabelProps={{ shrink: true }}
                  onChange={(e) => {
                    const updated = { ...edu, startDate: e.target.value };
                    handleUpdate(index, updated);
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="结束日期"
                  type="date"
                  value={edu.endDate || ''} // 单个字段兜底
                  InputLabelProps={{ shrink: true }}
                  onChange={(e) => {
                    const updated = { ...edu, endDate: e.target.value };
                    handleUpdate(index, updated);
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="描述"
                  multiline
                  rows={2}
                  value={edu.description || ''} // 单个字段兜底
                  onChange={(e) => {
                    const updated = { ...edu, description: e.target.value };
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
                label="学校"
                value={currentEdu.institution}
                onChange={(e) => setCurrentEdu({...currentEdu, institution: e.target.value})}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="学历"
                value={currentEdu.degree}
                onChange={(e) => setCurrentEdu({...currentEdu, degree: e.target.value})}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="专业"
                value={currentEdu.major}
                onChange={(e) => setCurrentEdu({...currentEdu, major: e.target.value})}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="开始日期"
                type="date"
                value={currentEdu.startDate}
                InputLabelProps={{ shrink: true }}
                onChange={(e) => setCurrentEdu({...currentEdu, startDate: e.target.value})}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="结束日期"
                type="date"
                value={currentEdu.endDate}
                InputLabelProps={{ shrink: true }}
                onChange={(e) => setCurrentEdu({...currentEdu, endDate: e.target.value})}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="描述"
                multiline
                rows={2}
                value={currentEdu.description}
                onChange={(e) => setCurrentEdu({...currentEdu, description: e.target.value})}
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
          + 添加教育背景
        </Button>
      )}
    </Box>
  );
};

export default EducationEditor;