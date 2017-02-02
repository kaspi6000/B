import React from 'react';
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';

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
    img: '../img/ez.jpg',
    title: 'title1',
    author: 'jill111',
    featured: true,
  },
  {
    img: 'images/grid-list/burger-827309_640.jpg',
    title: 'title2',
    author: 'pashminu',
  },
  {
    img: 'images/grid-list/camera-813814_640.jpg',
    title: 'title3',
    author: 'Danson67',
  },
  {
    img: 'images/grid-list/morning-819362_640.jpg',
    title: 'title4',
    author: 'fancycrave1',
    featured: true,
  },
  {
    img: 'images/grid-list/hats-829509_640.jpg',
    title: 'title5',
    author: 'Hans',
  },
  {
    img: 'images/grid-list/honey-823614_640.jpg',
    title: 'title6',
    author: 'fancycravel',
  },
  {
    img: 'images/grid-list/vegetables-790022_640.jpg',
    title: 'title7',
    author: 'jill111',
    featured : true,
  },
  {
    img: 'images/grid-list/water-plant-821293_640.jpg',
    title: 'title8',
    author: 'BkrmadtyaKarki',
  },
  {
    img: 'images/grid-list/water-plant-821293_630.jpg',
    title: 'title9',
    author: 'kkag',
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
          <img src={'../img'} />
        </GridTile>
      ))}
    </GridList>
  </div>
);

export default BestTopic;
