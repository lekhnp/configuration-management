import React from 'react';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    grow: {
        flexGrow: 1
    },
    section: {
        display: 'flex',
        padding: '0px 8px 8px',
        alignItems: 'center' 
    },
    heading: {
        ...theme.typography.h6
    }
}));

const PageHeading = (props) => {
    const styles = useStyles();

    return (
        <section className={styles.section}>
            <div className={styles.heading}>
                {props.heading}
            </div>
            <div className={styles.grow} />
                {props.action}
        </section>
    )
}

export default PageHeading;