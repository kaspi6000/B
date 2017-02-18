import React from 'react';
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import CONFIG from '../models/m-config.js';

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  gridList: {
    width: 800,
    height: 450,
    overflowY: '',
  },
};

const tilesData = [
  {
    img: 'img/park.jpg',
    title: '정치',
    author: 'kang',
    featured: true,
  },
  {
    img: 'img/choi.jpg',
    title: '정치',
    author: 'kang',
  },
  {
    img: 'img/kim.jpg',
    title: '정치',
    author: 'kang',
  },
  {
    img: 'img/cancel.png',
    title: '경제',
    author: 'kang',
    featured: true,
  },
  {
    img: 'img/ez.jpg',
    title: '경제',
    author: 'kang',
  },
  {
    img: 'img/kt.jpg',
    title: '경제',
    author: 'kang',
  },
  {
    img: 'img/menu.svg',
    title: '연예',
    author: 'kang',
    featured : true,
  },
  {
    img: 'img/vi.jpg',
    title: '연예',
    author: 'kang',
  },
  {
    img: 'img/iu.jpg',
    title: '연예',
    author: 'kang',
  },
];

const BestTopic = () => (
  <div style={styles.root}>
    <GridList
      cols={4}
      cellHeight={200}
      padding={1}
      style={styles.gridList}
    >
      {tilesData.map((tile) => (
        <GridTile
          key={tile.img}
          title={tile.title}
          actionIcon={<IconButton><StarBorder color="white" /></IconButton>}
          actionPosition="left"
          titlePosition="top"
          titleBackground="linear-gradient(to bottom, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)"
          cols={tile.featured ? 2 : 1}
          rows={tile.featured ? 2 : 1}
        >
          <img
            src={ CONFIG.backendUrl + tile.img }
          />
        </GridTile>
      ))}
    </GridList>
  </div>
);

export default BestTopic;
