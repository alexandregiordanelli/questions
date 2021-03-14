import { Header } from 'components/Header'
import { HeadHtml } from 'components/HeadHtml'
import { MarkdownText } from 'components/MarkdownText'
import { NextPage } from 'next'
import React from 'react'

const Privacy: NextPage = () => {
  return (
    <>
      <HeadHtml />
      <Header />
      <MarkdownText
        md={`
        # Website Terms and Conditions of Use

        ## 1. Terms
        
        By accessing this Website, accessible from https://questionsof.com, you are agreeing to be bound by these Website Terms and Conditions of Use and agree that you are responsible for the agreement with any applicable local laws. If you disagree with any of these terms, you are prohibited from accessing this site. The materials contained in this Website are protected by copyright and trade mark law.
        
        ## 2. Use License
        
        Permission is granted to temporarily download one copy of the materials on QuestionsOf's Website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
        
        *   modify or copy the materials;
        *   use the materials for any commercial purpose or for any public display;
        *   attempt to reverse engineer any software contained on QuestionsOf's Website;
        *   remove any copyright or other proprietary notations from the materials; or
        *   transferring the materials to another person or "mirror" the materials on any other server.
        
        This will let QuestionsOf to terminate upon violations of any of these restrictions. Upon termination, your viewing right will also be terminated and you should destroy any downloaded materials in your possession whether it is printed or electronic format. These Terms of Service has been created with the help of the [Terms Of Service Generator](https://www.termsofservicegenerator.net) and the [Privacy Policy Generator](https://www.generateprivacypolicy.com).
        
        ## 3. Disclaimer
        
        All the materials on QuestionsOf’s Website are provided "as is". QuestionsOf makes no warranties, may it be expressed or implied, therefore negates all other warranties. Furthermore, QuestionsOf does not make any representations concerning the accuracy or reliability of the use of the materials on its Website or otherwise relating to such materials or any sites linked to this Website.
        
        ## 4. Limitations
        
        QuestionsOf or its suppliers will not be hold accountable for any damages that will arise with the use or inability to use the materials on QuestionsOf’s Website, even if QuestionsOf or an authorize representative of this Website has been notified, orally or written, of the possibility of such damage. Some jurisdiction does not allow limitations on implied warranties or limitations of liability for incidental damages, these limitations may not apply to you.
        
        ## 5. Revisions and Errata
        
        The materials appearing on QuestionsOf’s Website may include technical, typographical, or photographic errors. QuestionsOf will not promise that any of the materials in this Website are accurate, complete, or current. QuestionsOf may change the materials contained on its Website at any time without notice. QuestionsOf does not make any commitment to update the materials.
        
        ## 6. Links
        
        QuestionsOf has not reviewed all of the sites linked to its Website and is not responsible for the contents of any such linked site. The presence of any link does not imply endorsement by QuestionsOf of the site. The use of any linked website is at the user’s own risk.
        
        ## 7. Site Terms of Use Modifications
        
        QuestionsOf may revise these Terms of Use for its Website at any time without prior notice. By using this Website, you are agreeing to be bound by the current version of these Terms and Conditions of Use.
        
        ## 8. Your Privacy
        
        Please read our Privacy Policy.
        
        ## 9. Governing Law
        
        Any claim related to QuestionsOf's Website shall be governed by the laws of br without regards to its conflict of law provisions.
  `}
        customerId={0}
      />
    </>
  )
}

export default Privacy
