import React, { useState, useEffect } from 'react';
// nodejs library to set properties for components
import PropTypes from 'prop-types';
// nodejs library that concatenates classes
import classNames from 'classnames';
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';

import paginationStyle from '../../../styles/jss/material-dashboard-react/components/paginationStyle.jsx';

const Pagination = props => {
  const { classes, color, className, listCallback, currentPage, totalPages = 0 } = props;
  const paginationClasses = classNames(classes.pagination, className);

  const [amount, setAmount] = useState(7);

  const screenHandler = () => {
    if (window.screen.width < 400) {
      setAmount(1);
    } else if (window.screen.width < 500) {
      setAmount(2);
    } else if (window.screen.width < 800) {
      setAmount(3);
    } else {
      setAmount(7);
    }
  };

  useEffect(() => {
    screenHandler();
    window.addEventListener('resize', screenHandler);
    return () => window.removeEventListener('resize', screenHandler);
  }, []);

  const preparePages = () => {
    const pages = [
      {
        text: '<<',
        onClick: () => {
          listCallback(1);
        },
      },
      {
        text: '<',
        onClick: () => {
          currentPage === 1 ? listCallback(1) : listCallback(currentPage - 1);
        },
      },
    ];
    for (
      let index = currentPage - amount > 0 ? currentPage - amount : 1;
      index <= currentPage + amount && index <= totalPages;
      index++
    ) {
      if (index === currentPage) {
        pages.push({ text: index, active: true });
      } else {
        pages.push({
          text: index,
          onClick: async () => {
            listCallback(index);
          },
        });
      }
    }
    pages.push({
      text: '>',
      onClick: () => {
        currentPage === totalPages ? listCallback(totalPages) : listCallback(currentPage + 1);
      },
    });
    pages.push({
      text: '>>',
      onClick: () => {
        listCallback(totalPages);
      },
    });
    return pages;
  };

  if (totalPages !== 0) {
    return (
      <ul className={paginationClasses}>
        {preparePages().map((prop, key) => {
          const paginationLink = classNames({
            [classes.paginationLink]: true,
            [classes[color]]: prop.active,
            [classes.disabled]: prop.disabled,
          });
          return (
            <li className={classes.paginationItem} key={key}>
              {prop.onClick !== undefined ? (
                <Button onClick={prop.onClick} className={paginationLink} disabled={prop.disabled}>
                  {prop.text}
                </Button>
              ) : (
                <Button className={paginationLink} disabled={prop.disabled}>
                  {prop.text}
                </Button>
              )}
            </li>
          );
        })}
      </ul>
    );
  } else {
    return null;
  }
};

Pagination.propTypes = {
  classes: PropTypes.object.isRequired,
  listCallback: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  color: PropTypes.oneOf([
    'primary',
    'info',
    'success',
    'warning',
    'danger',
    'gamsRed',
    'gamsBlue',
    'gamsBlack',
    'gamsGray',
    'gamsWhite',
  ]),
  className: PropTypes.string,
};

export default withStyles(paginationStyle)(Pagination);
