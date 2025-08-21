import { DEFAULT_ENV, test } from "./main.js";

// Verify that main works with a custom GitHub API URL passed as `github-api-url` input
await test(
  (mockPool) => {
    mockPool
      .intercept({
        path: `/v1/ai/language-model`,
        method: "POST",
        body: JSON.stringify({
          prompt: [
            {
              role: "user",
              content: [{ type: "text", text: "Why is the sky blue?" }],
            },
          ],
        }),
      })
      .reply(
        200,
        {
          content: [
            {
              type: "reasoning",
              text: "",
              providerMetadata: {
                openai: {
                  itemId: "rs_68a6a5077fc881949e85ba48e33c71240e8d0cd4c69d5848",
                  reasoningEncryptedContent:
                    "gAAAAABopqUMDqrLIWk0X_1JmyyMdgyEUiWKQ9mXPD7ZzO0jSag7MvJtns8DkVtkDJzI3-XHBZe_2KZnIyG5x3WL3-sof_SNtyqB8w8_8NTnHqt5w6VVE0PhX1B3uRv00_r8tbS44jKOK949VbIfQ4-YEu854dH9Fe0R_G3XLUXjl01WajiXATSzKDfsxcZTpMmhshLllsQAGFi5KeqspqxF6Lgx07K9vhYSC0W3VM45hm9VHL01PAiwCDl_RwTHGYt2Basd2xwNupG4l9oEma43xlr9Q8hqYBL0eYiq-go8JZbWkrtA1sJCLmPQ9xs0bdd8-pxfHvK3s_ztXSIY7pJig3vDa_VtPD5Pk-GiHJBrhGGlbaIlO4vXywF_JMdDFQBoLWb2zoYkKxsFT1_uzE6wd_cppxItXoTL0JqhEt8YIWpSBmriLIhOW89F5OjUpRyzm60VwCGgUQWuadEkee86A-wYe9rvihfgU3B6HtT2MhauOUsY3p34URJNJgIPIsTljJYo3mFAtBzoyn-zLG9Qr1xtEqFvlvZDC-aCtvr2zeCkMrztckbz47QbyPM0e_fpvJsCaDOJZ-GIAjK8jOEOKw5TpyF6Kpg3JmbVgvY8rP9-EVUpXV9R0Nsx6V7960gk9qy6U86WeL2QTd-xF8rC16JZxraREvQGijdBbBee7H0rIzMLZz0KrFGxL9ClXJ723skj6sTw91jEpPOWjZ-AvnIU9q4mxQq4a7Ke-ekdDmUg1bu8QPyrlIp19CmNaKflmlMrPY_tpL9N6c3VDuqn8ejnlroXatLxUsLJu6j-9ZiS50bwb7yKF9KiBZLWo0C2rHhcSrkxJK_Jchut5v9o9FIJXZsv0HpJwc8KpsFW6BVGgnvR3Gd71qOru6WGlq8fSVwu5YCE4YgCY46vDywsWr7fbffUZ-nTA25yzw_VsmwNPNfvqzh0VeGNRiYYjYfHdGAljJyis25wHnD7RB1Md8rq1anDA3Za2sXtiBZ9GEdsnraB44P1Rk-4bu6A86Ve_5YTIjAHrWecQUO-aTuQl3_b3jRPPsSLEarRi0F72qXYyD_09CgWxvOzDW4Keeh02qVvdA_dh-KQGwR3kYhvWwh14UR95ZgHk8zQQS2-MgGbVlYloFSrtXzFj6G1kvv1fFjtK0ZDiJ0m0Xebn0Y_3gvRrOxK78goO-h9uHW-PXvWuAGg6jnAi2NTnVkqDwn73d0ppV1jLrAXKlRSyA-z8ldCduFDUHYU8VMbwinCLpfZwy7RNLtJX-qqN1cljjOqjRivSGYyukGIsDT_-AQ8N970ZJSQwkv5rYKxQuNpi3V9XZHnRCYex39XSIvL__HUWPylDA7hvsWVaTPTeQrp8Py5ExWQxAGwFpqZ2szu2RI76n2j1vm3jK0owN3PeIAjjjmOm2aDN9gBN2t6MtX6FCNEizRX1KFfzFHlw4wW4HCgN3F-nKi7gH-vQU2PQKnhx201c5l_-3nQUkEuekq2y4KPntYpvEwDxdN1IfgvEGpM77LjHgmUnAU0o7hvZpikJU96ES-A7X_aj7BVllWlTyasRGOSwu9Pf1bizJ41X-3tGrJSMsP5foW9K05WWk9LKZ_wGjiYnduCnbBxjz9kdmDMHAgYW_aTR-eOtyOiXYbeWdByY35LR1Me438kxCxJ7lDYLYj8kBY8DirtikGYWg1pLe2QVqLzEaOniOo1CoRwM4YJYN0gNgh7f0c1Ig9NxJn8z6bgQubErQRJJPB94pV6NCftSkXaUKGfQeU2XiFfRO7CFiZqzYqv2UMi4a-S9ji0fUrV26TE31l9V1-w9qPM_YmxTt8_Zvr96X5YH4v8JOPsO-cz6sAlCmOCIrIPsmx3Tf3G4VeM_T9GW0zvHTJaVxnueY00ANqt4osH3C4Qh6cemG5cDbhEi6t__UmvNb6kXZmlJgupgR0YNhBEEXLJnvCEFFUv12UOqfeutO0tbz73jG64aGf-CGFxSCBnhpTrcXye0lgE6nAbdo04zcEd4KWSqKM2A1F-J431vi3C709SL0f4rkQAiep6ip3dqjwGtnlpdS-9t8FRavLMLIrjSRVi5pJ6qzGZH1WFhSHBgVyyUoWT8R4ypA2gystiMRfFevxrOleTYPX2l6XWwFCJFscBthMOI0Vw5CqUmwiwhr3xvhstJRGCwPDGcX0XXHHDM4Kx-0e78ldBG75nAE7fUpn7Ovx-orthB5CzJ0e_ey5Fw1Urf4fdQDBpyprQyk8CCY89m-7oWTun41bV1r1DK_b8YYOiMK27BLpsrDfcehV90MtWi4K9Sml63G3Ih8ZYeUcz0Xk0wLOuHXI7ZtbMwWVRiIVF_ASg3vBDfiCTMCGGUySfLfjq5CPsM8wqte9RvrVL6xmPKHwc_M9lJsX4YY1_STP3YNSdLS97Mr9IWyMMX91llbWPAYs4bExji6oloAOL61p4W8MYnhmgItMWcT3Nhtu_tr9fsmuCVblMKIKvA6s8B8pAniEUyKDGtyu5NQ7AGlkC4kIfiuhg4GeQoBjIX-2o4vAHsfDWWdbReKCx-w40gXkgtuPTdCLkNmb0oz64RAI9xv9hatOkVBCrZnljH42OPl8SFSQdbbWKRfKojFg=",
                },
              },
            },
            {
              type: "text",
              text:
                "Because air molecules scatter sunlight, and they scatter short wavelengths (blues/violets) much more strongly than long wavelengths (reds). This effect, called Rayleigh scattering, goes roughly as 1/(wavelength^4). The scattered blue light comes to us from all directions, making the sky look blue.\n" +
                "\n" +
                "We don’t see a violet sky because:\n" +
                "- Our eyes are less sensitive to violet than blue.\n" +
                "- Some violet/UV light is absorbed in the upper atmosphere.\n" +
                "\n" +
                "At sunrise and sunset, sunlight travels a longer path through the air, so most blue light is scattered out before reaching you; the remaining direct light is richer in reds and oranges. If the sky looks whitish, larger particles (haze, dust) are causing Mie scattering, which is less wavelength-selective.",
              providerMetadata: {
                openai: {
                  itemId:
                    "msg_68a6a50a9dbc819480e1fa95e5b89f4e0e8d0cd4c69d5848",
                },
              },
            },
          ],
          finishReason: "stop",
          usage: {
            inputTokens: 12,
            outputTokens: 422,
            totalTokens: 434,
            reasoningTokens: 256,
            cachedInputTokens: 0,
          },
          providerMetadata: {
            openai: {
              responseId:
                "resp_68a6a50707d481949c284a58a13c66920e8d0cd4c69d5848",
            },
            gateway: {
              routing: {
                originalModelId: "openai/gpt5",
                resolvedProvider: "openai",
                resolvedProviderApiModelId: "gpt-5-2025-08-07",
                internalResolvedModelId: "openai:gpt-5-2025-08-07",
                fallbacksAvailable: [],
                internalReasoning:
                  "Used provider hint 'openai' for gpt-5. 0 fallback(s) available: ",
                planningReasoning:
                  "System credentials planned for: openai. Total execution order: openai(system)",
                canonicalSlug: "openai/gpt-5",
                finalProvider: "openai",
                attempts: [
                  {
                    provider: "openai",
                    internalModelId: "openai:gpt-5-2025-08-07",
                    providerApiModelId: "gpt-5-2025-08-07",
                    credentialType: "system",
                    success: true,
                    startTime: 1272.661862,
                    endTime: 7020.178385,
                  },
                ],
              },
              cost: "0",
            },
          },
          warnings: [],
        },
        { headers: { "content-type": "application/json" } }
      );
  },
  {
    ...DEFAULT_ENV,
    INPUT_PROMPT: "Why is the sky blue?",
    INPUT_MODEL: "openai/gpt5",
    "INPUT_API-KEY": "vck_12345",
  }
);
