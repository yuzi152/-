import React, { createContext, useContext, useReducer, useEffect, useMemo } from 'react';

const ResumeContext = createContext();

const initialState = {
  personalInfo: {
    name: '',
    title: '',
    email: '',
    phone: '',
    address: '',
    photo: '',
    summary: '',
    birthYear: '',
    school: ''
  },
  sections: {
    education: [],
    experience: [],
    projects: []
  },
  template: 'classic',
  theme: {
    primaryColor: '#2563eb',
    fontSize: 14,
    fontFamily: 'Arial'
  }
};

function resumeReducer(state, action) {
  // Ensure sections exist (fallback to initialState if missing)
  const currentSections = state.sections || initialState.sections;

  switch (action.type) {
    case 'UPDATE_PERSONAL_INFO':
      return {
        ...state,
        personalInfo: {
          ...state.personalInfo,
          ...action.payload
        }
      };
    case 'ADD_EDUCATION':
      return {
        ...state,
        sections: {
          ...currentSections,
          education: [...currentSections.education, action.payload]
        }
      };
    case 'UPDATE_EDUCATION':
      return {
        ...state,
        sections: {
          ...currentSections,
          education: currentSections.education.map((edu, idx) =>
            idx === action.index ? action.payload : edu
          )
        }
      };
    case 'REMOVE_EDUCATION':
      return {
        ...state,
        sections: {
          ...currentSections,
          education: currentSections.education.filter((_, idx) => idx !== action.index)
        }
      };
    case 'ADD_EXPERIENCE':
      return {
        ...state,
        sections: {
          ...currentSections,
          experience: [...currentSections.experience, action.payload]
        }
      };
    case 'UPDATE_EXPERIENCE':
      return {
        ...state,
        sections: {
          ...currentSections,
          experience: currentSections.experience.map((exp, idx) =>
            idx === action.index ? action.payload : exp
          )
        }
      };
    case 'REMOVE_EXPERIENCE':
      return {
        ...state,
        sections: {
          ...currentSections,
          experience: currentSections.experience.filter((_, idx) => idx !== action.index)
        }
      };
    // Keep other cases (ADD_PROJECT, UPDATE_SKILLS, etc.) with the same pattern
    case 'ADD_PROJECT':
      return {
        ...state,
        sections: {
          ...currentSections,
          projects: [...currentSections.projects, { 
            id: action.payload.id,
            name: action.payload.name || '',
            role: action.payload.role || '',
            startDate: action.payload.startDate || '',
            endDate: action.payload.endDate || '',
            description: action.payload.description || ''
          }]
        }
      };

    case 'UPDATE_PROJECT':
      return {
        ...state,
        sections: {
          ...currentSections,
          projects: currentSections.projects.map((project, idx) =>
            idx === action.index ? { 
              ...action.payload,
              name: action.payload.name || '',
              role: action.payload.role || '',
              startDate: action.payload.startDate || '',
              endDate: action.payload.endDate || '',
              description: action.payload.description || ''
            } : project
          )
        }
      };
    case 'REMOVE_PROJECT':
      return {
        ...state,
        sections: {
          ...currentSections,
          projects: currentSections.projects.filter((_, idx) => idx !== action.index)
        }
      };
    case 'UPDATE_SKILLS':
      return {
        ...state,
        sections: {
          ...currentSections,
          skills: action.payload
        }
      };
    case 'UPDATE_LANGUAGES':
      return {
        ...state,
        sections: {
          ...currentSections,
          languages: action.payload
        }
      };
    case 'CHANGE_TEMPLATE':
      return {
        ...state,
        template: action.payload
      };
    case 'CHANGE_THEME':
      return {
        ...state,
        theme: {
          ...state.theme,
          ...action.payload
        }
      };
    case 'LOAD_RESUME':
      // Validate loaded resume data before replacing state
      return {
        ...initialState,
        ...action.payload,
        sections: {
          ...initialState.sections,
          ...action.payload.sections
        },
        theme: {
          ...initialState.theme,
          ...action.payload.theme
        }
      };
    default:
      return state;
  }
}

export const ResumeProvider = ({ children }) => {
  const [state, dispatch] = useReducer(resumeReducer, initialState);

  // 异步初始化状态
  useEffect(() => {
    const loadData = async () => {
      try {
        const savedResume = localStorage.getItem('resumeData');
        if (savedResume) {
          const parsedData = JSON.parse(savedResume);
          dispatch({ type: 'LOAD_RESUME', payload: parsedData });
        }
      } catch (error) {
        console.error('Error loading resume data:', error);
      }
    };
    loadData();
  }, []);

  // 节流写入 localStorage
  useEffect(() => {
    const timer = setTimeout(() => {
      localStorage.setItem('resumeData', JSON.stringify(state));
    }, 500); // 延迟 500ms 写入
    return () => clearTimeout(timer);
  }, [state]);

  // 使用 useMemo 缓存 context 值
  const contextValue = useMemo(() => ({ state, dispatch }), [state]);

  return (
    <ResumeContext.Provider value={contextValue}>
      {children}
    </ResumeContext.Provider>
  );
};

export const useResume = () => {
  const context = useContext(ResumeContext);
  if (!context) {
    throw new Error('useResume must be used within a ResumeProvider');
  }
  return context;
};