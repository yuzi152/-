import React from 'react';
import { Box, Typography, Divider, Chip, Grid } from '@mui/material';
import { useResume } from '../../contexts/ResumeContext';

const formatProjectPeriod = (startDate, endDate) => {
  if (!startDate) return '时间段';
  
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const [year, month] = dateString.split('-');
    return `${year.slice(2)}.${month.padStart(2, '0')}`;
  };
  
  const startFormatted = formatDate(startDate);
  const endFormatted = formatDate(endDate);
  
  return endDate ? `${startFormatted}-${endFormatted}` : startFormatted;
};

const ResumePreview = () => {
  const { state } = useResume();
  // 解构theme并设置默认值，防止undefined
  const { theme = {}, personalInfo = {}, sections = {} } = state;
  const { 
    primaryColor = '#2563eb', 
    fontSize = 14, 
    fontFamily = 'Arial' 
  } = theme;

  return (
    <Box id="resume-preview" sx={{
      backgroundColor: 'white',
      padding: 3,
      borderRadius: 2,
      boxShadow: 2,
      minHeight: '100%',
      fontFamily: fontFamily,
      fontSize: `${fontSize}px`
    }}>
      {/* 个人信息部分 - 改为图片在右上角，左侧信息的布局 */}
      <Grid container spacing={2} alignItems="flex-start">
        <Grid item xs={8}>
          <Typography variant="h3" component="h1" sx={{ color: primaryColor, mb: 1 }}>
            {personalInfo.name || '您的姓名'}
          </Typography>
          <Typography variant="h5" sx={{ mb: 2, color: 'text.secondary' }}>
            {personalInfo.title || '求职意向'}
          </Typography>
          
          {/* 个人信息行 - 出生日期和毕业院校在同一行 */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mb: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flex: 1 }}>
                <Typography variant="body2" sx={{ fontWeight: 'bold' }}>🎂</Typography>
                <Typography variant="body2">
                  {personalInfo.birthYear ? `出生日期：${personalInfo.birthYear}` : '出生日期：'}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flex: 1 }}>
                <Typography variant="body2" sx={{ fontWeight: 'bold' }}>🎓</Typography>
                <Typography variant="body2">
                  {personalInfo.school ? `毕业院校：${personalInfo.school}` : '毕业院校：'}
                </Typography>
              </Box>
            </Box>
            
            {/* 电话和邮箱在同一行 */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flex: 1 }}>
                <Typography variant="body2" sx={{ fontWeight: 'bold' }}>📱</Typography>
                <Typography variant="body2">
                  {personalInfo.phone ? `电话：${personalInfo.phone}` : '电话：'}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flex: 1 }}>
                <Typography variant="body2" sx={{ fontWeight: 'bold' }}>📧</Typography>
                <Typography variant="body2">
                  {personalInfo.email ? `邮箱：${personalInfo.email}` : '邮箱：'}
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* 个人优势 */}
          {personalInfo.summary && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: primaryColor, mb: 1 }}>
                个人优势
              </Typography>
              <Typography variant="body2" sx={{ whiteSpace: 'pre-line' }}>
                {personalInfo.summary}
              </Typography>
            </Box>
          )}
        </Grid>
        <Grid item xs={4} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
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
              <Typography variant="body2" color="text.secondary">照片</Typography>
            </Box>
          )}
        </Grid>
      </Grid>

      <Divider sx={{ my: 2 }} />

      {/* 教育背景部分 */}
      {sections.education?.length > 0 && (
        <Box sx={{ mt: 2, textAlign: 'left' }}>
          <Typography variant="h6" sx={{
            borderBottom: `2px solid ${primaryColor}`,
            pb: 0.5,
            mb: 1,
            color: primaryColor,
            fontWeight: 'bold'
          }}>
            教育背景
          </Typography>
          {sections.education.map((edu, index) => (
            <Box key={index} sx={{ mb: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                  {edu.institution || '学校'}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {edu.startDate || '开始日期'} - {edu.endDate || '结束日期'}
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                {edu.degree} | {edu.major || '专业'}
              </Typography>
              {edu.description && (
                <Typography variant="body2">{edu.description}</Typography>
              )}
            </Box>
          ))}
        </Box>
      )}

      {/* 工作经验部分 */}
      {sections.experience?.length > 0 && (
        <Box sx={{ mt: 3, textAlign: 'left' }}>
          <Typography variant="h6" sx={{
            borderBottom: `2px solid ${primaryColor}`,
            pb: 0.5,
            mb: 1,
            color: primaryColor,
            fontWeight: 'bold'
          }}>
            工作经验
          </Typography>
          {sections.experience.map((exp, index) => (
            <Box key={index} sx={{ mb: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                  {exp.position || '职位'}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {exp.startDate || '开始日期'} - {exp.endDate || '结束日期'}
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                {exp.company || '公司'}
              </Typography>
              {exp.description && (
                <Typography variant="body2">{exp.description}</Typography>
              )}
            </Box>
          ))}
        </Box>
      )}

      {/* 项目经历部分 */}
      {sections.projects?.length > 0 && (
        <Box sx={{ mt: 3, textAlign: 'left' }}>
          <Typography variant="h6" sx={{
            borderBottom: `2px solid ${primaryColor}`,
            pb: 0.5,
            mb: 1,
            color: primaryColor,
            fontWeight: 'bold'
          }}>
            项目经历
          </Typography>
          {sections.projects.map((project, index) => (
            <Box key={index} sx={{ mb: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                  {project.name || '项目名称'}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {formatProjectPeriod(project.startDate, project.endDate)}
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                {project.role || '角色'}
              </Typography>
              {project.description && (
                <Typography variant="body2">{project.description}</Typography>
              )}
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default ResumePreview;