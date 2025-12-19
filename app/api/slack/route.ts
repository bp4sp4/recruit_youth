import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, contact, region, source } = body

    const slackWebhookUrl = process.env.SLACK_WEBHOOK_URL

    if (!slackWebhookUrl) {
      console.error('SLACK_WEBHOOK_URL 환경 변수가 설정되지 않았습니다.')
      return NextResponse.json(
        { error: 'Slack webhook URL이 설정되지 않았습니다.' },
        { status: 500 }
      )
    }

    // Slack 메시지 포맷
    const message = {
      text: '🎉 새로운 지원자가 등록되었습니다!',
      blocks: [
        {
          type: 'header',
          text: {
            type: 'plain_text',
            text: '🎉 새로운 지원자 등록',
            emoji: true,
          },
        },
        {
          type: 'divider',
        },
        {
          type: 'section',
          fields: [
            {
              type: 'mrkdwn',
              text: `*이름:*\n${name}`,
            },
            {
              type: 'mrkdwn',
              text: `*연락처:*\n${contact}`,
            },
            {
              type: 'mrkdwn',
              text: `*지역:*\n${region || '미선택'}`,
            },
            {
              type: 'mrkdwn',
              text: `*유입 경로:*\n${source || '직접 접속'}`,
            },
          ],
        },
        {
          type: 'divider',
        },
        {
          type: 'context',
          elements: [
            {
              type: 'mrkdwn',
              text: `등록 시간: ${new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' })}`,
            },
          ],
        },
      ],
    }

    const response = await fetch(slackWebhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('Slack webhook 오류:', errorText)
      return NextResponse.json(
        { error: 'Slack 알림 전송 실패' },
        { status: response.status }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('Slack 알림 오류:', error)
    return NextResponse.json(
      { error: error.message || '알 수 없는 오류가 발생했습니다.' },
      { status: 500 }
    )
  }
}

