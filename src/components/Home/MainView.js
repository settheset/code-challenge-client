import ArticleList from '../ArticleList'
import React from 'react'
import agent from '../../agent'
import { connect } from 'react-redux'
import { CHANGE_TAB } from '../../constants/actionTypes'

const YourFeedTab = props => {
  if (props.token) {
    const clickHandler = ev => {
      ev.preventDefault()
      props.onTabClick('feed', agent.Posts.feed, agent.Posts.feed())
    }

    return (
      <li className="nav-item">
        <a
          href=""
          className={props.tab === 'feed' ? 'nav-link active' : 'nav-link'}
          onClick={clickHandler}
        >
          Your Feed
        </a>
      </li>
    )
  }
  return null
}

const GlobalFeedTab = props => {
  const clickHandler = ev => {
    ev.preventDefault()
    props.onTabClick('all', agent.Posts.all, agent.Posts.all())
  }
  return (
    <li className="nav-item">
      <a
        href=""
        className={props.tab === 'all' ? 'nav-link active' : 'nav-link'}
        onClick={clickHandler}
      >
        Global Feed
      </a>
    </li>
  )
}

const mapStateToProps = state => ({
  ...state.postList,
  tags: state.home.tags,
  token: state.common.token,
})

const mapDispatchToProps = dispatch => ({
  onTabClick: (tab, pager, payload) =>
    dispatch({ type: CHANGE_TAB, tab, pager, payload }),
})

const MainView = props => {
  return (
    <div className="col-md-12">
      <div className="feed-toggle">
        <ul className="nav nav-pills outline-active">
          <YourFeedTab
            token={props.token}
            tab={props.tab}
            onTabClick={props.onTabClick}
          />

          <GlobalFeedTab tab={props.tab} onTabClick={props.onTabClick} />
        </ul>
      </div>

      <ArticleList
        pager={props.pager}
        posts={props.posts}
        loading={props.loading}
        postsCount={props.postsCount}
        currentPage={props.currentPage}
      />
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(MainView)
