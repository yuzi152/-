import React from 'react';
import { TextField, Box, Typography, Avatar, IconButton, Grid } from '@mui/material';
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
    summary: ''
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
            label="职位"
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
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="地址"
            value={personalInfo.address}
            onChange={(e) => handleChange('address', e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="个人简介"
            multiline
            rows={4}
            value={personalInfo.summary}
            onChange={(e) => handleChange('summary', e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Avatar
              src={personalInfo.photo}
              alt="头像"
              sx={{ width: 80, height: 80 }}
            >
              {!personalInfo.photo && '头像'}
            </Avatar>
            <IconButton color="primary" aria-label="上传照片">
              <CameraAltIcon />
            </IconButton>
            <Typography variant="body2">点击上传照片</Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PersonalInfoEditor;