import React from 'react';
import { Box, Typography, Divider, Chip } from '@mui/material';
import { useResume } from '../../contexts/ResumeContext';

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
      fontFamily: fontFamily, // 使用解构后的默认值
      fontSize: `${fontSize}px`
    }}>
      {/* 个人信息部分 */}
      <Box sx={{ textAlign: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1" sx={{ color: primaryColor }}>
          {personalInfo.name || '您的姓名'}
        </Typography>
        <Typography variant="h6" sx={{ mt: 1, color: 'text.secondary' }}>
          {personalInfo.title || '职位名称'}
        </Typography>
        <Divider sx={{ my: 2 }} />

        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3, flexWrap: 'wrap', mb: 2 }}>
          <Typography variant="body2">{personalInfo.email || '邮箱'}</Typography>
          <Typography variant="body2">{personalInfo.phone || '电话'}</Typography>
          <Typography variant="body2">{personalInfo.address || '地址'}</Typography>
        </Box>

        {personalInfo.summary && (
          <Box sx={{ textAlign: 'left', mt: 2 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: primaryColor }}>
              个人简介
            </Typography>
            <Typography variant="body2">{personalInfo.summary}</Typography>
          </Box>
        )}
      </Box>

      {/* 工作经验部分 */}
      {sections.experience?.length > 0 && ( // 可选链保护
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
              <Typography variant="body2">{exp.description || '工作描述'}</Typography>
            </Box>
          ))}
        </Box>
      )}

      {/* 教育背景部分 */}
      {sections.education?.length > 0 && ( // 可选链保护
        <Box sx={{ mt: 3, textAlign: 'left' }}>
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
                  {edu.degree || '学历'}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {edu.startDate || '开始日期'} - {edu.endDate || '结束日期'}
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                {edu.institution || '学校'}
              </Typography>
              <Typography variant="body2">{edu.description || '描述'}</Typography>
            </Box>
          ))}
        </Box>
      )}

      {/* 技能部分 */}
      {sections.skills?.length > 0 && ( // 可选链保护
        <Box sx={{ mt: 3, textAlign: 'left' }}>
          <Typography variant="h6" sx={{
            borderBottom: `2px solid ${primaryColor}`,
            pb: 0.5,
            mb: 1,
            color: primaryColor,
            fontWeight: 'bold'
          }}>
            技能
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {sections.skills.map((skill, index) => (
              <Chip key={index} label={skill} variant="outlined" size="small" />
            ))}
          </Box>
        </Box>
      )}

      {/* 语言部分 */}
      {sections.languages?.length > 0 && ( // 可选链保护
        <Box sx={{ mt: 3, textAlign: 'left' }}>
          <Typography variant="h6" sx={{
            borderBottom: `2px solid ${primaryColor}`,
            pb: 0.5,
            mb: 1,
            color: primaryColor,
            fontWeight: 'bold'
          }}>
            语言能力
          </Typography>
          {sections.languages.map((lang, index) => (
            <Typography key={index} variant="body2">
              {lang.language}: {lang.proficiency}
            </Typography>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default ResumePreview;