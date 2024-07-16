// SIDEBAR TOGGLE

let sidebarOpen = false;
const sidebar = document.getElementById('sidebar');

function openSidebar() {
  if (!sidebarOpen) {
    sidebar.classList.add('sidebar-responsive');
    sidebarOpen = true;
  }
}
function closeSidebar() {
  if (sidebarOpen) {
    sidebar.classList.remove('sidebar-responsive');
    sidebarOpen = false;
  }
}

// ---------- CHARTS ----------

// BAR CHART
const barChartOptions = {
  series: [
    {
      data: [16, 14, 10, 9, 4],
    },
  ],
  chart: {
    type: 'bar',
    height: 350,
    toolbar: {
      show: false,
    },
  },
  colors: ['#246dec', '#cc3c43', '#367952', '#f5b74f', '#4f35a1'],
  plotOptions: {
    bar: {
      distributed: true,
      borderRadius: 4,
      horizontal: false,
      columnWidth: '40%',
    },
  },
  dataLabels: {
    enabled: false,
  },
  legend: {
    show: false,
  },
  xaxis: {
    categories: ['Feasibility', 'User management', 'low cost', 'time-saving', 'gorgeous UI'],
  },
  yaxis: {
    title: {
      text: 'Count',
    },
  },
};

const barChart = new ApexCharts(
  document.querySelector('#bar-chart'),
  barChartOptions
);
barChart.render();

// AREA CHART
const areaChartOptions = {
  series: [
    {
      name: 'Active User',
      data: [11,21, 14, 19, 22, 9, 24],
    },
    {
      name: 'Active Chat Group',
      data: [2, 3, 1, 4, 3, 1, 5],
    },
  ],
  chart: {
    height: 350,
    type: 'area',
    toolbar: {
      show: false,
    },
  },
  colors: ['#4f35a1', '#246dec'],
  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: 'smooth',
  },
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
  markers: {
    size: 0,
  },
  yaxis: [
    {
      title: {
        text: 'Active User',
      },
    },
    {
      opposite: true,
      title: {
        text: 'Active Chat Group',
      },
    },
  ],
  tooltip: {
    shared: true,
    intersect: false,
  },
};

const areaChart = new ApexCharts(
  document.querySelector('#area-chart'),
  areaChartOptions
);
areaChart.render();

function toggleSearch() {
    var searchInput = document.getElementById('searchInput');
    var searchResults = document.getElementById('searchResults'); // 新增这一行
    if (searchInput.style.display === 'none' || searchInput.style.display === '') {
        searchInput.style.display = 'inline-block';
        searchInput.focus(); // 聚焦输入框
    } else {
        searchInput.style.display = 'none';
        searchResults.style.display = 'none'; // 新增这一行
    }
}

function search() {
    var input = document.getElementById('searchInput').value.toLowerCase();
    var results = document.getElementById('searchResults');
    results.innerHTML = '';

    if (input === '') {
        results.style.display = 'none';
        return;
    }

    var texts = Array.from(document.querySelectorAll('.main-container, .main-cards, .charts, .charts-card'));
    var matches = texts.filter(el => el.textContent.toLowerCase().includes(input)).slice(0, 10);

    matches.forEach((match, index) => {
        var div = document.createElement('div');
        div.className = 'result-item';
        div.textContent = match.textContent.substring(0, 100); // 限制显示长度
        div.onclick = () => {
            match.scrollIntoView({ behavior: 'smooth', block: 'center' });
        };
        results.appendChild(div);
    });

    results.style.display = matches.length > 0 ? 'block' : 'none';
}

function showUserManagementSubMenu() {
    document.getElementById('userManagementSubMenu').style.display = 'block';
}

function hideUserManagementSubMenu() {
    document.getElementById('userManagementSubMenu').style.display = 'none';
}

document.addEventListener('DOMContentLoaded', () => {
    var announcements = JSON.parse(localStorage.getItem('announcements')) || [];
    var announcementHistory = document.getElementById('announcementHistory');
    
    announcements.forEach(text => {
        var announcementDiv = document.createElement('div');
        announcementDiv.className = 'announcement';
        if (text.length > 20) {
            announcementDiv.textContent = text.substring(0, 20) + '...';
        } else {
            announcementDiv.textContent = text;
        }
        announcementDiv.setAttribute('data-fulltext', text);
        announcementHistory.appendChild(announcementDiv);
    });
});

function toggleSearch() {
    var searchInput = document.getElementById('searchInput');
    var searchResults = document.getElementById('searchResults');
    if (searchInput.style.display === 'none' || searchInput.style.display === '') {
        searchInput.style.display = 'inline-block';
        searchInput.focus(); // 聚焦输入框
    } else {
        searchInput.style.display = 'none';
        searchResults.style.display = 'none';
    }
}

function search() {
    var input = document.getElementById('searchInput').value.toLowerCase();
    var results = document.getElementById('searchResults');
    results.innerHTML = '';

    if (input === '') {
        results.style.display = 'none';
        return;
    }

    var texts = Array.from(document.querySelectorAll('.main-container, .main-cards, .charts, .charts-card'));
    var matches = texts.filter(el => el.textContent.toLowerCase().includes(input)).slice(0, 10);

    matches.forEach((match, index) => {
        var div = document.createElement('div');
        div.className = 'result-item';
        div.textContent = match.textContent.substring(0, 100); // 限制显示长度
        div.onclick = () => {
            match.scrollIntoView({ behavior: 'smooth', block: 'center' });
        };
        results.appendChild(div);
    });

    results.style.display = matches.length > 0 ? 'block' : 'none';
}

// 更新公告数量
function updateAnnouncementCount() {
    var announcements = JSON.parse(localStorage.getItem('announcements')) || [];
    var announcementCount = announcements.length;
    var announcementCountElement = document.getElementById('announcementCount');
    if (announcementCountElement) {
        announcementCountElement.textContent = announcementCount;
    }
}

// 添加公告
function addAnnouncement() {
    var text = document.getElementById('announcementText').value;
    if (text.length === 0) return;

    var announcementHistory = document.getElementById('announcementHistory');
    var announcementDiv = document.createElement('div');
    announcementDiv.className = 'announcement';
    announcementDiv.setAttribute('data-fulltext', text); // 存储完整内容

    if (text.length > 100) {
        text = text.substring(0, 100) + '...';
    }
    announcementDiv.textContent = text;

    // 添加删除按钮
    var deleteButton = document.createElement('button');
    deleteButton.className = 'delete-btn';
    deleteButton.innerHTML = '&times;';
    deleteButton.onclick = function() {
        deleteAnnouncement(announcementDiv);
    };
    announcementDiv.appendChild(deleteButton);

    // 添加到历史记录
    announcementHistory.appendChild(announcementDiv);

    // 更新 localStorage
    updateMainPageAnnouncements(text);

    // 清空输入框
    document.getElementById('announcementText').value = '';

    // 更新公告计数
    updateAnnouncementCount();
}

// 删除单个公告
function deleteAnnouncement(element) {
    var text = element.getAttribute('data-fulltext');
    var announcements = JSON.parse(localStorage.getItem('announcements')) || [];
    var index = announcements.indexOf(text);
    if (index > -1) {
        announcements.splice(index, 1);
        localStorage.setItem('announcements', JSON.stringify(announcements));
    }
    element.remove();

    // 更新公告计数
    updateAnnouncementCount();
}

// 删除所有公告
function deleteAllAnnouncements() {
    localStorage.removeItem('announcements');
    const announcementHistory = document.getElementById('announcementHistory');
    if (announcementHistory) {
        announcementHistory.innerHTML = '';
    }
    const mainAnnouncementHistory = document.getElementById('announcements-container');
    if (mainAnnouncementHistory) {
        mainAnnouncementHistory.innerHTML = '';
    }
    // 更新公告计数
    updateAnnouncementCount();
}

// 更新主页上的历史公告
function updateMainPageAnnouncements(text) {
    var announcements = JSON.parse(localStorage.getItem('announcements')) || [];
    announcements.push(text);
    localStorage.setItem('announcements', JSON.stringify(announcements));
}

// DOM内容加载完成后执行
document.addEventListener('DOMContentLoaded', () => {
    // 检查登录状态并显示登录成功信息
    if (localStorage.getItem('isLoggedIn') === 'true') {
      document.getElementById('loginMessage').style.display = 'block';
      localStorage.removeItem('isLoggedIn'); // 显示完之后清除状态
    }

    // 初始化公告历史记录
    var announcements = JSON.parse(localStorage.getItem('announcements')) || [];
    var announcementHistory = document.getElementById('announcementHistory');
    
    // 清空现有公告，避免重复
    announcementHistory.innerHTML = '';

    announcements.forEach(text => {
        var announcementDiv = document.createElement('div');
        announcementDiv.className = 'announcement';
        announcementDiv.setAttribute('data-fulltext', text);
        if (text.length > 100) {
            announcementDiv.textContent = text.substring(0, 100) + '...';
        } else {
            announcementDiv.textContent = text;
        }
        announcementHistory.appendChild(announcementDiv); // 添加到公告历史记录中
    });
    if (localStorage.getItem('isLoggedIn') === 'true') {
        document.getElementById('loginMessage').style.display = 'block';
    }
  });


    // 更新公告计数
    updateAnnouncementCount();


