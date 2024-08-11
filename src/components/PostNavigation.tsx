import { useState } from 'react';

type TabType = 'all' | 'my';

function PostNavigation() {
  const [activeTab, setActiveTab] = useState<TabType>('all');

  return (
    <div className="post__navigation">
      <div
        role="presentation"
        className={activeTab === 'all' ? 'post__navigation--active' : ''}
        onClick={() => setActiveTab('all')}
      >
        전체
      </div>
      <div
        role="presentation"
        className={activeTab === 'my' ? 'post__navigation--active' : ''}
        onClick={() => setActiveTab('my')}
      >
        나의 글
      </div>
    </div>
  );
}

export default PostNavigation;
