$(document).ready(function () {

    // Effect: fadeIn
    $(".departments").hide().fadeIn(1000);

    // Effect: slideToggle
    $("#toggleFormBtn").click(function () {
      $(".departments").slideToggle();
    });

    // Suggestion List
    const ministries = [
      "Worship Team",
      "Sunday School",
      "Youth Ministry",
      "Media Team",
      "Prayer Ministry",
      "Hospitality",
      "Outreach Team",
      "Choir",
      "Bible Study Group",
      "Translation Team"
    ];
  
    // Auto Suggestion
    $("#ministry").on("input", function () {
      const inputVal = $(this).val().toLowerCase();
      $("#ministrySuggestions").empty();
  
      if (inputVal.length > 0) {
        const matches = ministries.filter(item =>
          item.toLowerCase().includes(inputVal)
        );
  
        matches.forEach(match => {
          $("#ministrySuggestions").append(
            `<div class="suggestion-item">${match}</div>`
          );
        });
      }
    });
  
    // When suggestion clicked insert in input field
    $(document).on("click", ".suggestion-item", function () {
      const selected = $(this).text();
      $("#ministry").val(selected);
      $("#ministrySuggestions").empty();
    });
  });
  