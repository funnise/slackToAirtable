export const elements =[
    {
        type: "text",
        label: "event name",
        name: "name",
        placeholder: 'foo'
      },
      {
        type: "text",
        label: "event url",
        name: "url",
        placeholder: "https://google.com",
      },
      {
        type: "text",
        label: "date",
        name: "date",
        placeholder: "2019/06/20",
      },
      {
        label: "Tech category",
        type: "select",
        name: "category",
        options: [
          {
            label: "AI",
            value: "AI"
          },
          {
            label: "Tool",
            value: "Tool"
          },
          {
            label: "Method",
            value: "Method"
          },
          {
            label: "Other",
            value: "Other"
          }]
        }]
