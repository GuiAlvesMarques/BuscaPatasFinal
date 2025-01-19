using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;

namespace BuscaPatasFinal.Controllers
{
    [Route("api/chat")]
    [ApiController]
    public class ChatbotController : ControllerBase
    {
        private static readonly Dictionary<string, string> Responses = new()
        {
            { "olá", "Olá! Como posso ajudar você hoje?" },
            { "adotar", "Para adotar um animal, visite a nossa página de adoção." },
            { "doação", "Você pode fazer uma doação através da seção de apoio no nosso site." },
            { "horário", "Nosso horário de atendimento é de segunda a sexta, das 9h às 18h." },
            { "contacto", "Você pode nos contatar pelo email suporte@buscapatas.com." },
            { "localização", "Estamos localizados em Lisboa, Portugal." },
            { "raças", "Temos informações sobre várias raças de cães e gatos em nossa seção Aprender." },
            { "obrigado", "De nada! Estou à disposição para ajudar." }
        };

        [HttpPost("ask")]
        public IActionResult Ask([FromBody] ChatRequest request)
        {
            if (request == null || string.IsNullOrWhiteSpace(request.Message))
            {
                return BadRequest(new { reply = "Por favor, envie uma mensagem válida." });
            }

            // Normalize input to lower case for comparison
            string userMessage = request.Message.ToLower();

            // Search for a matching keyword in the predefined dictionary
            var response = Responses.FirstOrDefault(pair => userMessage.Contains(pair.Key)).Value;

            if (response == null)
            {
                response = "Desculpe, não entendi. Por favor, reformule sua pergunta.";
            }

            return Ok(new { reply = response });
        }
    }

    public class ChatRequest
    {
        public string Message { get; set; }
    }
}