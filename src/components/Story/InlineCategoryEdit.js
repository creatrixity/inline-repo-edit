import React, { Component } from 'react';

import { connect } from 'react-redux';

import { broadcastComment } from '../../post/Write/editorActions';

@connect(
  state => ({
    categories: state.categories,
  })
);

class InlineCategoryEdit extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            value: props.value
        }

        this.onCategoryChange = this.onCategoryChange.bind(this);

        console.log(this.state.categories);
    }

    onCategoryChange (e) {
        this.setState({
            category: e.target.value
        });

        const { author, body, permlink, title, reward_weight, parent_permlink, parent_author } = this.post;

        broadcastComment(
          parent_author,
          parent_permlink,
          author,
          title,
          body,
          metadata,
          permlink,
          reward_weight
      ).then((res) => {
          console.log(res);
      });

    }

    isSelectedCategory (category) {
        return this.state.value === category ? 'selected' : '';
    }

    render () {
        const categories = this.state.categories.map((category) => (
            <option value={category.title} selected={this.isSelectedCategory(category)} key={category.id}>{category.title}</option>
        ))

        return (
            <div>
                <select className="inline-category-edit-select" onChange={ this.onCategoryChange }>
                    {categories}
                </select>
            </div>
        );
    }
}

export default InlineCategoryEdit;
