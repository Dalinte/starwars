import { CardMedia, Typography } from '@mui/material';
import { StyledCard, StyledCardContent, StyledTypography } from './style.ts';
import Box from '@mui/material/Box';
import { generateCharacterDescription } from '@/utils/generateCharacterDescription.ts';
import type { CharacterWithId } from '@/types';

interface CharacterCardProps {
  character: CharacterWithId;
  showFullDescription?: boolean;
  onClick: () => void;
}

export const CharacterCard = ({
  character,
  onClick,
  showFullDescription = false,
}: CharacterCardProps) => {
  return (
    <StyledCard variant="outlined" sx={{ height: '100%', textAlign: 'start' }} onClick={onClick}>
      <CardMedia
        component="img"
        alt="green iguana"
        image={`https://picsum.photos/800/450?random=${character.id}`}
        sx={{
          height: { sm: 'auto', md: '50%' },
          aspectRatio: { sm: '16 / 9', md: '' },
        }}
      />
      <StyledCardContent>
        <Typography gutterBottom variant="caption" component="div">
          Character
        </Typography>
        <Typography gutterBottom variant="h6" component="div">
          {character.name}
        </Typography>
        <StyledTypography
          variant="body2"
          color="text.secondary"
          gutterBottom
          dangerouslySetInnerHTML={{
            __html: generateCharacterDescription(character)[showFullDescription ? 'full' : 'short'],
          }}
        ></StyledTypography>
      </StyledCardContent>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          gap: 2,
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '16px',
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1, alignItems: 'center' }}>
          <Typography variant="caption">
            {character.height} sm / {character.mass} kg
          </Typography>
        </Box>
        <Typography variant="caption">{character.birth_year}</Typography>
      </Box>
    </StyledCard>
  );
};
