const btn = document.getElementById("btn");
    const results = document.getElementById("results");
    const countDisplay = document.getElementById("count");

    let clickCount = 0; // Initialize button click count
    let apiCallsMade = 0; // Initialize API calls count
    let lastCallTime = 0; // Initialize time of last API call

    const fetchData = () => {
      fetch('https://jsonplaceholder.typicode.com/todos/1')
        .then(response => response.json())
        .then(data => {
          results.innerHTML = `<p>ID: ${data.id}</p><p>Title: ${data.title}</p><p>Completed: ${data.completed}</p>`;
        })
        .catch(error => {
          console.error('Error:', error);
        });
    };

    const throttleFetch = () => {
      const now = Date.now();
      // Check if 10 seconds have elapsed since last call
      if (now - lastCallTime >= 10000) {
        apiCallsMade = 0; // Reset API calls count if 10 seconds have passed
      }
      // Check if less than 5 API calls made in last second
      if (apiCallsMade < 5) {
        apiCallsMade++; // Increment API calls count
        fetchData(); // Make API call
        lastCallTime = now; // Update time of last call
      }
      // Update count display
      countDisplay.textContent = ++clickCount;
      // Reset count display after 10 seconds
      setTimeout(() => {
        countDisplay.textContent = 0;
        clickCount = 0; // Reset button click count
      }, 10000);
    };

    btn.addEventListener('click', throttleFetch);

