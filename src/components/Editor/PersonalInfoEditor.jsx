import React from 'react';
import { TextField, Box, Typography, Avatar, IconButton, Grid, Button } from '@mui/material';
import { useResume } from '../../contexts/ResumeContext';
import CameraAltIcon from '@mui/icons-material/CameraAlt';

const PersonalInfoEditor = () => {
  const { state, dispatch } = useResume();
  // 核心修复：给 personalInfo 加默认值，防止 undefined
  const personalInfo = state.personalInfo || {
    name: '',
    title: '',
    email: '',
    phone: '',
    address: '',
    photo: '',
    summary: '',
    birthYear: '',
    school: ''
  };

  const handleChange = (field, value) => {
    dispatch({ type: 'UPDATE_PERSONAL_INFO', payload: { [field]: value } });
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        个人信息
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="姓名"
            // 改用兜底后的 personalInfo
            value={personalInfo.name}
            onChange={(e) => handleChange('name', e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="求职意向"
            value={personalInfo.title}
            onChange={(e) => handleChange('title', e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="邮箱"
            type="email"
            value={personalInfo.email}
            onChange={(e) => handleChange('email', e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="电话"
            value={personalInfo.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="出生日期"
            type="date"
            value={personalInfo.birthYear}
            onChange={(e) => handleChange('birthYear', e.target.value)}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="毕业院校"
            value={personalInfo.school}
            onChange={(e) => handleChange('school', e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="地址"
            value={personalInfo.address}
            onChange={(e) => handleChange('address', e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="个人简介"
            multiline
            rows={3}
            value={personalInfo.summary}
            onChange={(e) => handleChange('summary', e.target.value)}
          />
        </Grid>
      </Grid>

      {/* 头像上传区域 */}
      <Box sx={{ mt: 3 }}>
        <Typography variant="subtitle1" gutterBottom>
          头像
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {personalInfo.photo ? (
            <Box
              component="img"
              src={personalInfo.photo}
              alt="头像"
              sx={{
                width: 80,
                height: 80,
                border: '2px solid #e0e0e0',
                borderRadius: 0 // 长方形，无圆角
              }}
            />
          ) : (
            <Box sx={{ 
              width: 80, 
              height: 80, 
              bgcolor: 'grey.200', 
              borderRadius: 0, // 长方形
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center' 
            }}>
              <Typography variant="body2" color="text.secondary">无照片</Typography>
            </Box>
          )}
          <Button
            variant="outlined"
            component="label"
            startIcon={<CameraAltIcon />}
          >
            上传头像
            <input
              type="file"
              accept="image/*"
              hidden
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onload = (event) => {
                    dispatch({ type: 'UPDATE_PERSONAL_INFO', payload: { photo: event.target.result } });
                  };
                  reader.readAsDataURL(file);
                }
              }}
            />
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default PersonalInfoEditor;