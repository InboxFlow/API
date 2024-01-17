type ResponseConfig = {
  message?: string;
  data?: any;
  error?: any;
};

function HTTP(status: number, config: ResponseConfig = {}) {
  const { data, error, message = "Message not found" } = config;

  const success = status >= 200 && status < 300;
  const body = JSON.stringify({ data, error, message, success });

  return new Response(body, {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

export { HTTP };
