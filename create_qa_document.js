const {
  Document, Packer, Paragraph, TextRun, AlignmentType, HeadingLevel,
  PageBreak, TableOfContents, convertInchesToTwip, Footer, PageNumber, NumberFormat
} = require('docx');
const fs = require('fs');
const { personaA_QAs, personaA_QAs_part2 } = require('./qa_data.js');
const { personaB_QAs, personaB_QAs_part2 } = require('./qa_data_personaB.js');

// ペルソナB の残りの質問(11-20) - 質問文のみ
const personaB_remaining = [
  "既存エンジニアをMLエンジニアに育成する方法は?",
  "AIチームの理想的な構成は?",
  "外部パートナーとの協業体制はどう組むべきか?",
  "マイクロサービスでAI機能を組み込む設計パターンは?",
  "大規模言語モデルのファインチューニングはすべきか?",
  "エッジAIとクラウドAIの使い分けは?",
  "データパイプラインの設計で気をつけることは?",
  "2024-2025年で押さえるべきAI技術トレンドは?",
  "技術顧問としてあなたは具体的に何をしてくれるのか?"
];

// ペルソナC の質問(1-20) - 質問文のみ
const personaC_questions = [
  "このアイデア(〇〇)は技術的に実現可能か?",
  "生成AIで金融業界の新規事業として有望な領域は?",
  "事業化までのロードマップをどう描けばよいか?",
  "競合サービスとの差別化ポイントをどう作るか?",
  "MVP(最小限の製品)はどこまで作ればよいか?",
  "経営陣を説得する資料はどう作ればよいか?",
  "社内稟議を通すコツは?",
  "IT部門との協業をどう進めればよいか?",
  "法務・コンプライアンスとの調整は?",
  "予算獲得のための説得材料は?",
  "ベンダー選定で失敗しないポイントは?",
  "見積もりの妥当性をどう判断すればよいか?",
  "内製 vs 外注の判断基準は?",
  "スタートアップとの協業で気をつけることは?",
  "PoCを事業化につなげるには何が必要か?",
  "過去2件のPoCが事業化できなかった原因は何だと思うか?",
  "事業化の判断基準(Go/No-Go)はどう設定すべきか?",
  "初期ユーザー獲得の戦略は?",
  "技術理解が浅い私がAI事業を推進するには何を学ぶべきか?",
  "あなた(コンサルタント)との週1の壁打ちで何が変わるのか?"
];

// Q&Aをパラグラフに変換する関数
function createQAParagraphs(qa, questionNumber) {
  const paragraphs = [];

  // 質問(太字、大きめのフォント)
  paragraphs.push(
    new Paragraph({
      text: `Q${questionNumber}. ${qa.question}`,
      heading: HeadingLevel.HEADING_3,
      spacing: { before: 400, after: 200 }
    })
  );

  // 回答がある場合
  if (qa.answer) {
    const { conclusion, background, approach, outcome, nextAction } = qa.answer;

    // 結論
    paragraphs.push(
      new Paragraph({
        children: [
          new TextRun({ text: "【回答】", bold: true, size: 24 }),
        ],
        spacing: { before: 200, after: 100 }
      }),
      new Paragraph({
        children: [
          new TextRun({ text: "■ 結論", bold: true, size: 22 }),
        ],
        spacing: { before: 150, after: 50 }
      }),
      new Paragraph({
        text: conclusion,
        spacing: { before: 50, after: 150 }
      })
    );

    // 背景・分析
    paragraphs.push(
      new Paragraph({
        children: [
          new TextRun({ text: "■ 背景・分析", bold: true, size: 22 }),
        ],
        spacing: { before: 150, after: 50 }
      }),
      new Paragraph({
        text: background,
        spacing: { before: 50, after: 150 }
      })
    );

    // 解決アプローチ
    paragraphs.push(
      new Paragraph({
        children: [
          new TextRun({ text: "■ 解決アプローチ", bold: true, size: 22 }),
        ],
        spacing: { before: 150, after: 50 }
      })
    );

    // アプローチのテキストを行ごとに分割
    const approachLines = approach.split('\n');
    approachLines.forEach(line => {
      if (line.trim()) {
        paragraphs.push(
          new Paragraph({
            text: line,
            spacing: { before: 50, after: 50 }
          })
        );
      }
    });

    // 期待される成果
    paragraphs.push(
      new Paragraph({
        children: [
          new TextRun({ text: "■ 期待される成果", bold: true, size: 22 }),
        ],
        spacing: { before: 200, after: 50 }
      }),
      new Paragraph({
        text: outcome,
        spacing: { before: 50, after: 150 }
      })
    );

    // 次のアクション
    paragraphs.push(
      new Paragraph({
        children: [
          new TextRun({ text: "■ 次のアクション", bold: true, size: 22 }),
        ],
        spacing: { before: 150, after: 50 }
      }),
      new Paragraph({
        text: nextAction,
        spacing: { before: 50, after: 200 }
      })
    );
  } else {
    // 回答がない場合(プレースホルダー)
    paragraphs.push(
      new Paragraph({
        text: "【回答】(詳細な回答は後ほど追加されます)",
        italics: true,
        spacing: { before: 200, after: 400 }
      })
    );
  }

  // ページブレーク(最後の質問以外)
  paragraphs.push(
    new Paragraph({
      children: [new PageBreak()]
    })
  );

  return paragraphs;
}

// 質問文のみのQ&Aを作成
function createQuestionOnlyParagraphs(question, questionNumber) {
  const paragraphs = [];

  paragraphs.push(
    new Paragraph({
      text: `Q${questionNumber}. ${question}`,
      heading: HeadingLevel.HEADING_3,
      spacing: { before: 400, after: 200 }
    }),
    new Paragraph({
      text: "【回答】(詳細な回答は後ほど追加されます)",
      italics: true,
      spacing: { before: 200, after: 400 }
    }),
    new Paragraph({
      children: [new PageBreak()]
    })
  );

  return paragraphs;
}

// ページ番号付きフッターを作成する関数
function createFooterWithPageNumber() {
  return {
    default: new Footer({
      children: [
        new Paragraph({
          alignment: AlignmentType.RIGHT,
          children: [
            new TextRun({
              children: [PageNumber.CURRENT]
            })
          ]
        })
      ]
    })
  };
}

// ドキュメント作成
const doc = new Document({
  sections: [
    // 表紙
    {
      properties: {
        page: {
          margin: {
            top: convertInchesToTwip(1),
            right: convertInchesToTwip(1),
            bottom: convertInchesToTwip(1),
            left: convertInchesToTwip(1)
          }
        }
      },
      footers: createFooterWithPageNumber(),
      children: [
        new Paragraph({
          text: "生成AI変革アーキテクト",
          heading: HeadingLevel.HEADING_1,
          alignment: AlignmentType.CENTER,
          spacing: { before: 3000, after: 400 }
        }),
        new Paragraph({
          text: "Q&A資料集",
          heading: HeadingLevel.HEADING_1,
          alignment: AlignmentType.CENTER,
          spacing: { after: 2000 }
        }),
        new Paragraph({
          text: "3つの顧客ペルソナ別",
          alignment: AlignmentType.CENTER,
          spacing: { after: 200 }
        }),
        new Paragraph({
          text: "想定質問と回答ガイド",
          alignment: AlignmentType.CENTER,
          spacing: { after: 3000 }
        }),
        new Paragraph({
          children: [new PageBreak()]
        })
      ]
    },

    // 目次
    {
      footers: createFooterWithPageNumber(),
      children: [
        new Paragraph({
          text: "目次",
          heading: HeadingLevel.HEADING_1,
          spacing: { before: 400, after: 400 }
        }),
        new Paragraph({
          text: "本資料は、生成AI変革アーキテクトとして想定される3つの顧客ペルソナごとに、",
          spacing: { after: 100 }
        }),
        new Paragraph({
          text: "彼らが本当に聞きたい質問と、期待を超える回答をまとめたものです。",
          spacing: { after: 400 }
        }),
        new Paragraph({
          text: "ペルソナA: CFO・経営層向け Q&A (20問)",
          spacing: { before: 200, after: 100 }
        }),
        new Paragraph({
          text: "  - ROI・投資対効果に関する質問",
          spacing: { after: 50 }
        }),
        new Paragraph({
          text: "  - 人材・組織に関する質問",
          spacing: { after: 50 }
        }),
        new Paragraph({
          text: "  - PoC・プロジェクト推進に関する質問",
          spacing: { after: 50 }
        }),
        new Paragraph({
          text: "  - 戦略・意思決定に関する質問",
          spacing: { after: 50 }
        }),
        new Paragraph({
          text: "  - リスク・契約に関する質問",
          spacing: { after: 300 }
        }),
        new Paragraph({
          text: "ペルソナB: CTO・技術責任者向け Q&A (20問)",
          spacing: { before: 200, after: 100 }
        }),
        new Paragraph({
          text: "  - 技術選定に関する質問",
          spacing: { after: 50 }
        }),
        new Paragraph({
          text: "  - 本番化・運用に関する質問",
          spacing: { after: 50 }
        }),
        new Paragraph({
          text: "  - チーム・採用に関する質問",
          spacing: { after: 50 }
        }),
        new Paragraph({
          text: "  - アーキテクチャに関する質問",
          spacing: { after: 50 }
        }),
        new Paragraph({
          text: "  - 最新動向・将来に関する質問",
          spacing: { after: 300 }
        }),
        new Paragraph({
          text: "ペルソナC: 新規事業責任者向け Q&A (20問)",
          spacing: { before: 200, after: 100 }
        }),
        new Paragraph({
          text: "  - 事業企画・実現可能性に関する質問",
          spacing: { after: 50 }
        }),
        new Paragraph({
          text: "  - 社内調整・稟議に関する質問",
          spacing: { after: 50 }
        }),
        new Paragraph({
          text: "  - ベンダー・パートナーに関する質問",
          spacing: { after: 50 }
        }),
        new Paragraph({
          text: "  - PoC・事業化に関する質問",
          spacing: { after: 50 }
        }),
        new Paragraph({
          text: "  - 自己成長・相談に関する質問",
          spacing: { after: 400 }
        }),
        new Paragraph({
          children: [new PageBreak()]
        })
      ]
    },

    // ペルソナA
    {
      footers: createFooterWithPageNumber(),
      children: [
        new Paragraph({
          text: "ペルソナA: CFO・経営層向け Q&A",
          heading: HeadingLevel.HEADING_1,
          spacing: { before: 400, after: 200 }
        }),
        new Paragraph({
          text: "田中 誠 (56歳) - 東証プライム上場製造業 CFO",
          spacing: { after: 100 }
        }),
        new Paragraph({
          text: "累計5億円のAI投資をしたが成果が見えず、経営からROIを厳しく問われている。",
          spacing: { after: 400 }
        }),
        new Paragraph({
          children: [new PageBreak()]
        }),

        // ペルソナAの全20問
        ...personaA_QAs.flatMap((qa, index) => createQAParagraphs(qa, index + 1)),
        ...personaA_QAs_part2.flatMap((qa, index) => createQAParagraphs(qa, index + 11))
      ]
    },

    // ペルソナB
    {
      footers: createFooterWithPageNumber(),
      children: [
        new Paragraph({
          text: "ペルソナB: CTO・技術責任者向け Q&A",
          heading: HeadingLevel.HEADING_1,
          spacing: { before: 400, after: 200 }
        }),
        new Paragraph({
          text: "佐藤 健太 (42歳) - SaaS企業 CTO / VPoE",
          spacing: { after: 100 }
        }),
        new Paragraph({
          text: "開発チーム20名統括。Web開発は得意だがML/AIは専門外。PoCは成功するが本番化が毎回失敗する。",
          spacing: { after: 400 }
        }),
        new Paragraph({
          children: [new PageBreak()]
        }),

        // ペルソナBの最初の10問(詳細な回答あり)
        ...personaB_QAs.flatMap((qa, index) => createQAParagraphs(qa, index + 1)),
        ...personaB_QAs_part2.flatMap((qa, index) => createQAParagraphs(qa, index + 6)),

        // ペルソナBの残り9問(質問文のみ)
        ...personaB_remaining.flatMap((question, index) =>
          createQuestionOnlyParagraphs(question, index + 12)
        )
      ]
    },

    // ペルソナC
    {
      footers: createFooterWithPageNumber(),
      children: [
        new Paragraph({
          text: "ペルソナC: 新規事業責任者向け Q&A",
          heading: HeadingLevel.HEADING_1,
          spacing: { before: 400, after: 200 }
        }),
        new Paragraph({
          text: "山田 麻衣 (38歳) - 大手金融機関 新規事業開発部 部長",
          spacing: { after: 100 }
        }),
        new Paragraph({
          text: "「生成AI活用の新規サービス立ち上げ」がミッション。ビジネス企画は得意だが技術の深い理解はない。",
          spacing: { after: 400 }
        }),
        new Paragraph({
          children: [new PageBreak()]
        }),

        // ペルソナCの全20問(質問文のみ)
        ...personaC_questions.flatMap((question, index) =>
          createQuestionOnlyParagraphs(question, index + 1)
        )
      ]
    }
  ]
});

// Word文書を出力
Packer.toBuffer(doc).then(buffer => {
  const outputPath = 'C:\\Users\\user\\Desktop\\CAIO_Q&A\\AI_Architect_QA_Guide.docx';
  fs.writeFileSync(outputPath, buffer);
  console.log('Word文書が正常に作成されました!');
  console.log(`出力先: ${outputPath}`);
  console.log('\n含まれる内容:');
  console.log('- 表紙');
  console.log('- 目次');
  console.log('- ペルソナA (CFO・経営層): 20問の詳細な回答');
  console.log('- ペルソナB (CTO・技術責任者): 11問の詳細な回答 + 9問の質問文のみ');
  console.log('- ペルソナC (新規事業責任者): 20問の質問文のみ');
  console.log('\n残りの回答は、必要に応じて後ほど追加できます。');
}).catch(error => {
  console.error('エラーが発生しました:', error);
});
