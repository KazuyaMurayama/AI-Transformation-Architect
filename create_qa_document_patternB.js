const {
  Document, Packer, Paragraph, TextRun, AlignmentType, HeadingLevel,
  PageBreak, convertInchesToTwip, Footer, PageNumber
} = require('docx');
const fs = require('fs');
const { personaA_QAs_PatternB } = require('./qa_data_patternB.js');

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

// パターンBのQ&Aをパラグラフに変換する関数
function createQAParagraphsPatternB(qa, questionNumber) {
  const paragraphs = [];

  // 質問
  paragraphs.push(
    new Paragraph({
      text: `Q${questionNumber}. ${qa.question}`,
      heading: HeadingLevel.HEADING_3,
      spacing: { before: 400, after: 200 }
    })
  );

  const answer = qa.answer;

  // 質問目的の確認
  if (answer.purposeConfirmation) {
    const lines = answer.purposeConfirmation.split('\n');
    lines.forEach(line => {
      if (line.trim()) {
        paragraphs.push(
          new Paragraph({
            text: line,
            spacing: { before: 50, after: 50 }
          })
        );
      }
    });
  }

  // レコメンデーション
  if (answer.recommendation) {
    const lines = answer.recommendation.split('\n');
    lines.forEach(line => {
      if (line.trim()) {
        paragraphs.push(
          new Paragraph({
            text: line,
            spacing: { before: 50, after: 50 }
          })
        );
      }
    });
  }

  // 推奨理由と他アプローチとの比較
  if (answer.reasoningAndAlternatives) {
    const lines = answer.reasoningAndAlternatives.split('\n');
    lines.forEach(line => {
      if (line.trim()) {
        paragraphs.push(
          new Paragraph({
            text: line,
            spacing: { before: 50, after: 50 }
          })
        );
      }
    });
  }

  // 具体アプローチ/ネクストステップ
  if (answer.concreteApproachAndNextSteps) {
    const lines = answer.concreteApproachAndNextSteps.split('\n');
    lines.forEach(line => {
      if (line.trim()) {
        paragraphs.push(
          new Paragraph({
            text: line,
            spacing: { before: 50, after: 50 }
          })
        );
      }
    });
  }

  // 関連事例
  if (answer.relatedCaseStudies) {
    const lines = answer.relatedCaseStudies.split('\n');
    lines.forEach(line => {
      if (line.trim()) {
        paragraphs.push(
          new Paragraph({
            text: line,
            spacing: { before: 50, after: 50 }
          })
        );
      }
    });
  }

  // ページブレーク
  paragraphs.push(
    new Paragraph({
      children: [new PageBreak()]
    })
  );

  return paragraphs;
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
          text: "CFO・経営層向け 最初の5問",
          alignment: AlignmentType.CENTER,
          spacing: { after: 200 }
        }),
        new Paragraph({
          text: "パターンB: 戦略的アドバイザリー構成",
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
          text: "本資料は、CFO・経営層（田中誠、56歳）向けの最初の5問について、",
          spacing: { after: 100 }
        }),
        new Paragraph({
          text: "パターンB（戦略的アドバイザリー構成）で回答したものです。",
          spacing: { after: 400 }
        }),
        new Paragraph({
          text: "パターンBの構成:",
          spacing: { before: 200, after: 100 }
        }),
        new Paragraph({
          text: "  1. 質問目的の確認（目的1、目的2を推測）",
          spacing: { after: 50 }
        }),
        new Paragraph({
          text: "  2. レコメンデーション（各目的に対する推奨アプローチ）",
          spacing: { after: 50 }
        }),
        new Paragraph({
          text: "  3. 推奨理由と他アプローチとの比較",
          spacing: { after: 50 }
        }),
        new Paragraph({
          text: "  4. 具体アプローチ / ネクストステップ",
          spacing: { after: 50 }
        }),
        new Paragraph({
          text: "  5. 関連事例（実際の企業事例、URL付き）",
          spacing: { after: 400 }
        }),
        new Paragraph({
          text: "収録質問:",
          spacing: { before: 200, after: 100 }
        }),
        new Paragraph({
          text: "  Q1: AI投資のROIをどうやって測定・可視化すればよいのか?",
          spacing: { after: 50 }
        }),
        new Paragraph({
          text: "  Q2: 5億円投資して成果が出ていないが、この投資は失敗だったのか?",
          spacing: { after: 50 }
        }),
        new Paragraph({
          text: "  Q3: 生成AIへの投資は今すべきか、様子を見るべきか?",
          spacing: { after: 50 }
        }),
        new Paragraph({
          text: "  Q4: 経営会議でAI投資の効果をどう説明すればよいか?",
          spacing: { after: 50 }
        }),
        new Paragraph({
          text: "  Q5: 競合他社はAIでどれくらいの成果を出しているのか?",
          spacing: { after: 400 }
        }),
        new Paragraph({
          children: [new PageBreak()]
        })
      ]
    },

    // Q&A本文
    {
      footers: createFooterWithPageNumber(),
      children: [
        new Paragraph({
          text: "ペルソナA: CFO・経営層向け Q&A (パターンB)",
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

        // Q1-Q5
        ...personaA_QAs_PatternB.flatMap((qa, index) => createQAParagraphsPatternB(qa, index + 1))
      ]
    }
  ]
});

// Word文書を出力
Packer.toBuffer(doc).then(buffer => {
  const outputPath = 'C:\\Users\\user\\Desktop\\CAIO_Q&A\\AI_Architect_QA_PatternB.docx';
  fs.writeFileSync(outputPath, buffer);
  console.log('Word文書（パターンB）が正常に作成されました!');
  console.log(`出力先: ${outputPath}`);
  console.log('\n含まれる内容:');
  console.log('- 表紙');
  console.log('- 目次');
  console.log('- ペルソナA (CFO・経営層): 5問の詳細な回答（パターンB構成）');
  console.log('\nパターンBの特徴:');
  console.log('- 質問目的の明確化（目的1、目的2）');
  console.log('- 複数アプローチの比較と推奨理由');
  console.log('- 実際の企業事例（URL付き）');
  console.log('- より戦略的なアドバイザリー構成');
}).catch(error => {
  console.error('エラーが発生しました:', error);
});
