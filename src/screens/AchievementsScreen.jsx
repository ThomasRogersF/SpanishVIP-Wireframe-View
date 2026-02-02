import React, { useState, useMemo } from 'react';
import {
  Box,
  Typography,
  IconButton,
  TextField,
  Select,
  MenuItem,
  Chip,
  LinearProgress,
  Grid,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SearchIcon from '@mui/icons-material/Search';
import AchievementCard from '../components/Profile/AchievementCard';
import { useNavigation } from '../hooks/useNavigation';
import mockUserData from '../data/mockUserData';

// Category mapping for achievement icons
const CATEGORY_MAP = {
  '🔥': { label: 'Streak', color: '#FF6B6B' },
  '📚': { label: 'Vocabulary', color: '#4ECDC4' },
  '🎯': { label: 'Perfect', color: '#45B7D1' },
  '🗣️': { label: 'Speaking', color: '#96CEB4' },
  '🏆': { label: 'League', color: '#FFEAA7' },
  '⭐': { label: 'XP', color: '#DDA0DD' },
};

const getCategory = (icon) => {
  return CATEGORY_MAP[icon] || { label: 'General', color: '#95A5A6' };
};

const AchievementsScreen = () => {
  const { goBack } = useNavigation();
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [searchQuery, setSearchQuery] = useState('');

  // Get achievements from mock data
  const achievements = mockUserData.achievements;

  // Filter and sort achievements
  const filteredAndSortedAchievements = useMemo(() => {
    let filtered = [...achievements];

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(achievement =>
        achievement.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply status filter
    if (filter === 'completed') {
      filtered = filtered.filter(a => !a.isLocked && a.progress === 100);
    } else if (filter === 'in-progress') {
      filtered = filtered.filter(a => !a.isLocked && a.progress > 0 && a.progress < 100);
    } else if (filter === 'locked') {
      filtered = filtered.filter(a => a.isLocked);
    }

    // Apply sorting
    if (sortBy === 'newest') {
      filtered.sort((a, b) => b.id - a.id);
    } else if (sortBy === 'oldest') {
      filtered.sort((a, b) => a.id - b.id);
    } else if (sortBy === 'progress') {
      filtered.sort((a, b) => b.progress - a.progress);
    }

    return filtered;
  }, [achievements, filter, sortBy, searchQuery]);

  // Calculate progress summary
  const progressSummary = useMemo(() => {
    const total = achievements.length;
    const completed = achievements.filter(a => !a.isLocked && a.progress === 100).length;
    const inProgress = achievements.filter(a => !a.isLocked && a.progress > 0 && a.progress < 100).length;
    const locked = achievements.filter(a => a.isLocked).length;
    return { total, completed, inProgress, locked };
  }, [achievements]);

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', overflow: 'auto' }}>
      {/* Header */}
      <Box
        sx={{
          px: 2.5,
          py: 2,
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          borderBottom: '1px solid',
          borderColor: 'divider',
        }}
      >
        <IconButton onClick={goBack} sx={{ p: 1 }}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h6" sx={{ fontWeight: 600, flex: 1 }}>
          All Achievements
        </Typography>
      </Box>

      {/* Progress Summary */}
      <Box
        sx={{
          px: 2.5,
          py: 2,
          backgroundColor: 'background.paper',
          borderBottom: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Typography variant="body2" color="text.secondary">
            Progress
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {progressSummary.completed} / {progressSummary.total}
          </Typography>
        </Box>
        <LinearProgress
          variant="determinate"
          value={(progressSummary.completed / progressSummary.total) * 100}
          sx={{ height: 8, borderRadius: 4, mb: 2 }}
        />
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          <Chip
            label={`Completed: ${progressSummary.completed}`}
            size="small"
            sx={{ backgroundColor: '#4CAF50', color: 'white' }}
          />
          <Chip
            label={`In Progress: ${progressSummary.inProgress}`}
            size="small"
            sx={{ backgroundColor: '#FF9800', color: 'white' }}
          />
          <Chip
            label={`Locked: ${progressSummary.locked}`}
            size="small"
            sx={{ backgroundColor: '#9E9E9E', color: 'white' }}
          />
        </Box>
      </Box>

      {/* Filter and Sort Controls */}
      <Box
        sx={{
          px: 2.5,
          py: 2,
          display: 'flex',
          gap: 2,
          flexWrap: 'wrap',
          alignItems: 'center',
          borderBottom: '1px solid',
          borderColor: 'divider',
        }}
      >
        <TextField
          placeholder="Search achievements..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          size="small"
          sx={{
            flex: 1,
            minWidth: 200,
            '& .MuiOutlinedInput-root': { borderRadius: 2 },
          }}
          InputProps={{
            startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />,
          }}
        />
        <Select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          size="small"
          sx={{
            minWidth: 120,
            '& .MuiOutlinedInput-root': { borderRadius: 2 },
          }}
        >
          <MenuItem value="all">All</MenuItem>
          <MenuItem value="completed">Completed</MenuItem>
          <MenuItem value="in-progress">In Progress</MenuItem>
          <MenuItem value="locked">Locked</MenuItem>
        </Select>
        <Select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          size="small"
          sx={{
            minWidth: 120,
            '& .MuiOutlinedInput-root': { borderRadius: 2 },
          }}
        >
          <MenuItem value="newest">Newest</MenuItem>
          <MenuItem value="oldest">Oldest</MenuItem>
          <MenuItem value="progress">Progress</MenuItem>
        </Select>
      </Box>

      {/* Achievements Grid */}
      <Box sx={{ px: 2.5, py: 2, flex: 1, overflow: 'auto' }}>
        {filteredAndSortedAchievements.length === 0 ? (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              py: 8,
              color: 'text.secondary',
            }}
          >
            <Typography variant="body1" sx={{ mb: 1 }}>
              No achievements found
            </Typography>
            <Typography variant="caption">
              Try adjusting your filters or search query
            </Typography>
          </Box>
        ) : (
          <Grid container spacing={2}>
            {filteredAndSortedAchievements.map((achievement) => {
              const category = getCategory(achievement.icon);
              return (
                <Grid item xs={12} key={achievement.id}>
                  <Box sx={{ position: 'relative' }}>
                    <Chip
                      label={category.label}
                      size="small"
                      sx={{
                        position: 'absolute',
                        top: -8,
                        right: 8,
                        backgroundColor: category.color,
                        color: 'white',
                        fontSize: '0.7rem',
                        height: 20,
                        zIndex: 1,
                      }}
                    />
                    <AchievementCard
                      icon={achievement.icon}
                      title={achievement.title}
                      description={achievement.description}
                      progress={achievement.progress}
                      isLocked={achievement.isLocked}
                    />
                  </Box>
                </Grid>
              );
            })}
          </Grid>
        )}
      </Box>
    </Box>
  );
};

export default AchievementsScreen;