const BookmarkButton = ({ isBookmarked, onClick }) => (
  <button type="button" className={`bookmark-btn ${isBookmarked ? 'active' : ''}`} onClick={onClick}>
    {isBookmarked ? '★ Bookmarked' : '☆ Bookmark'}
  </button>
)

export default BookmarkButton
