{const e=e=>`<li>\n    <h2>${e.title}</h2>\n    <p>-By ${e.author}</p>\n    <p>${e.desc}</p>\n    <div class="label-tags">\n      <ul>\n        ${e.labels.map((e=>`<li>${e}</li>`))}\n      </ul>\n    </div>\n  </li>`,t=()=>{$.ajax({type:"GET",url:"/issues/authors",success:function(e){const t=$("#author-selector");$(t).empty(),$(t).append('<option value="" selected disabled>Filter By Author</option>');let o="";e.data.authors.forEach((e=>{o+=`<option value="${e}">${e}</option>`})),$(t).append(o)},error:function(e){console.log(e)}})},o=e=>{$.ajax({type:"GET",url:`/projects/previous-issues/${e}`,success:function(e){$("#label-filter-container").empty();let t="";e.labels.forEach((e=>{t+=`<option value="${e}">${e}</option>`})),$("#label-filter-container").append(t)},error:function(e){console.log(e)}})};!function(){t();const s=window.location.href.split("/")[4];o(s);[$("#filter-by-issue-labels"),$("#filter-by-author"),$("#search-title-desc")].forEach((t=>{$(t).submit((function(o){o.preventDefault(),$.ajax({type:"POST",url:$(this).attr("action"),data:$(this).serialize(),success:function(o){let s="";s=o.filteredData?.length>0?"Filters Applied":"Nothing to show",$("#show-filtered-heading").text(`Issues : ${s}`);const n=$(".issues-container > ul");$(n).empty(),o.filteredData.forEach((t=>{const o=e(t);$(n).append(o)})),$(t).each((function(){this.reset()}))},error:function(e){console.log(e.Message)}})}))}))}()}